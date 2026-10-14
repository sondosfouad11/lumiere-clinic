import { createContext, useCallback, useContext, useRef, useState } from "react";

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

/* Shares two things across the page: opening the booking dialog, and showing a toast. */
export function AppProvider({ children }) {
  const [bookingTopic, setBookingTopic] = useState(null); // null = closed
  const [toastText, setToastText] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const timer = useRef(null);

  const openBooking = useCallback((topic = "") => setBookingTopic(topic || ""), []);
  const closeBooking = useCallback(() => setBookingTopic(null), []);

  const toast = useCallback((message) => {
    setToastText(message);
    setToastVisible(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToastVisible(false), 2600);
  }, []);

  return (
    <AppContext.Provider value={{ bookingTopic, openBooking, closeBooking, toast, toastText, toastVisible }}>
      {children}
    </AppContext.Provider>
  );
}
