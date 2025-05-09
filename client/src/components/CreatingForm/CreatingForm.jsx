import { useState, useContext } from "react";
import axios from "axios";
import Button from "../ui/Button/Button.jsx";
import Input from "../ui/Input/Input.jsx";
import TextArea from "../ui/TextArea/TextArea.jsx";
import styles from "./CreatingForm.module.css";
import { appealsContext } from "../../context/context.jsx";
import { useAlert } from "../../context/alertContext.jsx";

const { VITE_API, VITE_BASE_URL } = import.meta.env;

export default function CreatingForm() {
  const { setAppeals, closeModal } = useContext(appealsContext);
  const { showAlert } = useAlert();

  const [newAppeal, setNewAppeal] = useState({
    topic: "",
    description: "",
  });

  async function handleCreateNewAppeal(e) {
    e.preventDefault();
    if (!newAppeal.topic || !newAppeal.description) {
      showAlert("Заполните все поля!", "error");
      return;
    }
    const { data } = await axios.post(
      `${VITE_BASE_URL}/${VITE_API}`,
      newAppeal
    );
    setAppeals((prev) => [...prev, data]);
    setNewAppeal({
      topic: "",
      description: "",
    });
    closeModal();
    showAlert("Обращение успешно создано", "success");
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
