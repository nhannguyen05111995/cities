// Modal as a separate component
import React from "react";
import { useEffect, useRef } from "react";
import classes from "./modal.module.scss";


interface ModalProps {
  openModal: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

function Modal({ openModal, closeModal, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();


    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog ref={ref} onCancel={closeModal} className={classes.modalClassName}>
      <div className="mb-2 text-end">
        <button className="btn btn-outline-dark" onClick={closeModal}><i className="bi bi-x-lg"></i></button>
      </div>
      {children}

      <div className="mt-2 text-end">
        <button className="btn btn-success" onClick={closeModal}>Apply</button>
      </div>
    </dialog>

  );
}

export default Modal;
