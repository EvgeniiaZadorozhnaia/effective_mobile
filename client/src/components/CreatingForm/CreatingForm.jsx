import React from "react";
import { useState } from "react";
import axios from "axios";
import Button from "../ui/Button/Button.jsx";
import Input from "../ui/Input/Input.jsx";
import TextArea from "../ui/TextArea/TextArea.jsx";
import styles from "./CreatingForm.module.css";

const { VITE_API, VITE_BASE_URL } = import.meta.env;

export default function CreatingForm({ onClose }) {
  const [newAppeal, setNewAppeal] = useState({
    topic: "",
    description: "",
  });

  async function handleCreateNewAppeal(e) {
    e.preventDefault();
    if (!newAppeal.topic || !newAppeal.description) {
      alert("Заполните все поля!");
      return;
    }
    await axios.post(`${VITE_BASE_URL}/${VITE_API}`, newAppeal);
    setNewAppeal({
      topic: "",
      description: "",
    });
    onClose();
  }

  return (
    <form className={styles.form} onSubmit={handleCreateNewAppeal}>
      <h1>Создание обращения</h1>
      <Input
        placeholder="Тема обращения"
        value={newAppeal.topic}
        onChange={(e) => setNewAppeal({ ...newAppeal, topic: e.target.value })}
      />
      <TextArea
        placeholder="Текст обращения"
        value={newAppeal.description}
        onChange={(e) =>
          setNewAppeal({ ...newAppeal, description: e.target.value })
        }
      />
      <Button type="submit">Создать обращение</Button>
    </form>
  );
}
