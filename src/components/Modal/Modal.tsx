import { createPortal } from "react-dom";
import { useRef, useEffect, ReactNode, useCallback } from "react";
import classes from "./Modal.module.css";
import closeIcon from "../../resources/images/cancel.png";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  content: ReactNode;
  header: ReactNode;
}

export default function Modal(props: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        props.onClose();
      }
    },
    [props.onClose]
  );

  const handlePopState = useCallback(() => {
    props.onClose();
    closeHandle()
  }, [props.onClose]);

  useEffect(() => {
    if (props.isOpen && dialog.current) {
      document.body.classList.add(classes["modal-open"]);
      document.addEventListener("keydown", handleKeyDown);
      window.addEventListener("popstate", handlePopState);
      dialog.current.showModal();
    } else if (dialog.current) {
      dialog.current.close();
      closeHandle()
      navigate(-1);
    }
  }, [props.isOpen, handleKeyDown, handlePopState]);

  function closeHandle(){
    document.body.classList.remove(classes["modal-open"]);
    document.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("popstate", handlePopState);
  }

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
