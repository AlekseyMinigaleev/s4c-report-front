import { createPortal } from "react-dom";
import { useRef, useEffect, ReactNode, DialogHTMLAttributes } from "react";
import classes from "./Modal.module.css";

interface ModalProps extends DialogHTMLAttributes<HTMLDialogElement> {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal(props: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (props.isOpen && dialog.current) {
      dialog.current.showModal();
      document.body.classList.add(classes["modal-open"]);
    } else if (dialog.current) {
      document.body.classList.remove(classes["modal-open"]);
      dialog.current.close();
    }
  }, [props.isOpen]);

  return createPortal(
    <dialog className={classes["dialog"]} ref={dialog} {...props}>
      <div className={classes["header"]}>
        <div
          className={classes["close-button"]}
          onClick={() => props.onClose()}
        >
          <img src={""} alt="Закрыть"></img>
        </div>

        <p className={classes["title"]}>{props.title}</p>

        <div className={classes["game-link"]}>
          <a>Перейти</a>
        </div>
      </div>

      <div className={classes["content"]}>{props.children}</div>
    </dialog>,
    document.getElementById("modal")!
  );
}
