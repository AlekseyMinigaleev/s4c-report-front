import { createPortal } from "react-dom";
import { useRef, useEffect, ReactNode, useCallback } from "react";
import classes from "./Modal.module.css";
import closeIcon from "../../resources/images/cancel.png";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  content: ReactNode;
  header: ReactNode;
}

export default function Modal(props: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  const handleClose = useCallback(() => {
    props.onClose();
  }, [props.onClose]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && props.isOpen) {
        handleClose();
      }
    },
    [handleClose, props.isOpen]
  );

  useEffect(() => {
    const handleKeyDownLocal = (event: KeyboardEvent) => {
      if (event.key === "Escape" && props.isOpen) {
        handleClose();
      }
    };

    if (props.isOpen && dialog.current) {
      document.body.classList.add(classes["modal-open"]);
      dialog.current.showModal();
      document.addEventListener("keydown", handleKeyDownLocal);
    } else if (dialog.current) {
      document.body.classList.remove(classes["modal-open"]);
      dialog.current.close();
      document.removeEventListener("keydown", handleKeyDownLocal);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDownLocal);
    };
  }, [props.isOpen, handleClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      {createPortal(
        <dialog className={classes["dialog"]} ref={dialog}>
          <div
            className={classes["close-button"]}
            onClick={() => props.onClose()}
          >
            <img src={closeIcon} width={45} alt="Закрыть" />
          </div>
          <div className={classes["header"]}>{props.header}</div>
          <div className={classes["content"]}>{props.content}</div>
        </dialog>,
        document.getElementById("modal")!
      )}
    </>
  );
}
