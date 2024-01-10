import { createPortal } from "react-dom";

export default function Footer() {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    return null;
  }

  return createPortal(<footer>footer</footer>, rootElement);
}
