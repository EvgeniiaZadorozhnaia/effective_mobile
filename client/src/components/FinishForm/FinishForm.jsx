import React, { useContext, useState } from "react";
import { appealsContext } from "../../context/context";
import axios from "axios";
import styles from "./FinishForm.module.css";
import TextArea from "../ui/TextArea/TextArea";
import Button from "../ui/Button/Button";

const { VITE_API, VITE_BASE_URL } = import.meta.env;

export default function FinishForm({ onClose }) {
  const { modal, setAppeals } = useContext(appealsContext);
  const [solution, setSolution] = useState("");

  async function handleFinishAppeal(e, id) {
    e.preventDefault();
    if (!solution) {
      alert("Заполните все поля!");
      return;
    }
    const response = await axios.patch(`${VITE_BASE_URL}/${VITE_API}/${id}`, {
      status: "finish",
      solution,
    });
    setAppeals((prev) =>
      prev.map((appeal) => (appeal.id === id ? response.data : appeal))
    );
    setSolution("");
    onClose();
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => handleFinishAppeal(e, modal.id)}>
      <h1>Закрытие обращения</h1>
      <TextArea
        placeholder="Как вы решили проблему"
        value={solution}
        onChange={(e) => setSolution(e.target.value)}
      />
      <Button type="submit">Закрыть обращение</Button>
    </form>
  );
}
