import { links } from "../data/siteData";
import Icon from "./Icon";

const NETWORKS = [
  { key: "facebook", label: "Facebook", icon: "i-facebook" },
  { key: "instagram", label: "Instagram", icon: "i-instagram" },
  { key: "linkedin", label: "LinkedIn", icon: "i-linkedin" }
];

export default function SocialList({ light }) {
  return (
    <ul className={`social-list${light ? " social-list-light" : ""}`}>
      {NETWORKS.map((n) => (
        <li key={n.key}>
          <a href={links[n.key]} target="_blank" rel="noopener noreferrer" aria-label={n.label}>
            <Icon id={n.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}
