import React, { useContext } from "react";
import styles from "./Modal.module.css";
import { appealsContext } from "../../context/context";

export default function Modal({ isOpen, children }) {
  const { closeModal } = useContext(appealsContext);
  
  if (!isOpen) return null;
  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={closeModal}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
