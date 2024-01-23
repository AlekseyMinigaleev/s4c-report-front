import { createPortal } from "react-dom";
import classes from "./Footer.module.css";

export default function Footer() {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    return null;
  }

  return createPortal(
    <footer className={classes["footer"]}>footer</footer>,
    rootElement
  );
}
