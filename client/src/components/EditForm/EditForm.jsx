import React, { useContext, useState } from "react";
import styles from "./EditForm.module.css";
import axios from "axios";
import TextArea from "../ui/TextArea/TextArea";
import Button from "../ui/Button/Button";
import { appealsContext } from "../../context/context";
import { useAlert } from "../../context/alertContext";

const { VITE_API, VITE_BASE_URL } = import.meta.env;

export default function EditForm({ type }) {
  const { modal, setAppeals, closeModal } = useContext(appealsContext);
  const [text, setText] = useState("");
  const isFinish = type === "finish";
  const label = isFinish ? "Как вы решили проблему" : "Введите причину отмены";
  const title = isFinish ? "Закрытие обращения" : "Отмена обращения";
  const buttonText = isFinish ? "Закрыть обращение" : "Отменить обращение";
  const alertMessage = isFinish
    ? "Обращение успешно закрыто"
    : "Обращение успешно отменено";

  const { showAlert } = useAlert();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text) {
      showAlert("Заполните все поля", "error");
      return;
    }
    const payload = {
      status: type,
      ...(isFinish ? { solution: text } : { cancel_reason: text }),
    };

    try {
      const response = await axios.patch(
        `${VITE_BASE_URL}/${VITE_API}/${modal.id}`,
        payload
      );
      setAppeals((prev) =>
        prev.map((appeal) => (appeal.id === modal.id ? response.data : appeal))
      );
      setText("");
      closeModal();
      showAlert(alertMessage, "success");
    } catch (error) {
      console.error("Error updating request", error);
    }
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>{title}</h1>
      <TextArea
        placeholder={label}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button type="submit">{buttonText}</Button>
    </form>
  );
}
