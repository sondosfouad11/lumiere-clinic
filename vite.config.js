import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Makes dist/index.html openable by double-click (file://): browsers block <script type="module">
// from file://, so the bundle is built as a classic script and loaded with defer.
const fileProtocolFriendly = () => ({
  name: "file-protocol-friendly",
  enforce: "post",
  transformIndexHtml(html) {
    return html
      .replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/g, "")
      .replace(/<link rel="stylesheet" crossorigin href="/g, '<link rel="stylesheet" href="')
      .replace("</body>", (m) => m); // placeholder, script re-added below
  },
  generateBundle(_, bundle) {
    const html = bundle["index.html"];
    const entry = Object.keys(bundle).find((k) => k.endsWith(".js"));
    if (html && entry) {
      html.source = String(html.source).replace("</body>", `<script defer src="./${entry}"></script></body>`);
    }
  }
});

// base "./" lets the built site work on GitHub Pages / Netlify / any sub-folder
export default defineConfig({
  plugins: [react(), fileProtocolFriendly()],
  base: "./",
  build: {
    cssCodeSplit: false,
    rollupOptions: { output: { format: "iife", inlineDynamicImports: true } }
  }
});
