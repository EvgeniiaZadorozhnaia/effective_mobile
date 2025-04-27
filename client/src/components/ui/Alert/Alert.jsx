import React from "react";
import styles from "./Alert.module.css";
import "animate.css";

export default function Alert({ type, message }) {
  const alertClass = type === "success" ? styles.success : styles.error;

  return (
    <div
      className={`animate__animated animate__fadeInRight ${styles.alert} ${alertClass}`}>
      {message}
    </div>
  );
}
