import React, { useState, useContext } from "react";
import { appealsContext } from "../../context/context";
import axios from "axios";
import styles from "./CancelForm.module.css";
import TextArea from "../ui/TextArea/TextArea";
import Button from "../ui/Button/Button";

const { VITE_API, VITE_BASE_URL } = import.meta.env;

export default function CancelForm({ onClose }) {
  const { modal, setAppeals } = useContext(appealsContext);
  const [reason, setReason] = useState("");

  async function handleCancelAppeal(e, id) {
    e.preventDefault();
    if (!reason) {
      alert("Заполните все поля!");
      return;
    }
    const response = await axios.patch(`${VITE_BASE_URL}/${VITE_API}/${id}`, {
      status: "cancel",
      cancel_reason: reason,
    });
    setAppeals((prev) =>
      prev.map((appeal) => (appeal.id === id ? response.data : appeal))
    );
    setReason("");
    onClose();
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => handleCancelAppeal(e, modal.id)}>
      <h1>Отмена обращения</h1>
      <TextArea
        placeholder="Введите причину отмены"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <Button type="submit">Отменить обращение</Button>
    </form>
  );
}
