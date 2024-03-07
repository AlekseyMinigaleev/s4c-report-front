import { createPortal } from "react-dom";
import { useRef, useEffect, ReactNode, DialogHTMLAttributes } from "react";
import classes from "./modal.module.css";
import closeIcon from "../../resources/images/close-icon.png";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal(props: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (props.isOpen && dialog.current) {
      document.body.classList.add(classes["modal-open"]);
      dialog.current.showModal();
    } else if (dialog.current) {
      document.body.classList.remove(classes["modal-open"]);
      dialog.current.close();
    }
  }, [props.isOpen]);

  return (
    <>
      {createPortal(
        <dialog className={classes["dialog"]} ref={dialog}>
          <div className={classes["header"]}>
            <div
              className={classes["close-button"]}
              onClick={() => props.onClose()}
            >
              <img src={closeIcon} width={25} alt="Закрыть"></img>
            </div>

            <p className={classes["title"]}>{props.title}</p>

            <div className={classes["game-link"]}>
              <a>Перейти</a>
            </div>
          </div>

          <div className={classes["content"]}>{props.children}</div>
        </dialog>,
        document.getElementById("modal")!
      )}
    </>
  );
}