import React, { useEffect, useContext } from "react";
import axios from "axios";
import styles from "./Table.module.css";
import { appealsContext } from "../../context/context";
import { useAlert } from "../../context/alertContext";

const { VITE_API, VITE_BASE_URL } = import.meta.env;

const statusLabels = {
  new: "Новое",
  work: "В работе",
  finish: "Завершено",
  cancel: "Отменено",
};

export default function Table() {
  const { appeals, setAppeals, openModal } = useContext(appealsContext);
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchAppeals = async () => {
      const response = await axios.get(`${VITE_BASE_URL}/${VITE_API}`);
      setAppeals(response.data);
    };
    fetchAppeals();
  }, []);

  const handleToWork = async (id) => {
    const response = await axios.patch(`${VITE_BASE_URL}/${VITE_API}/${id}`, {
      status: "work",
    });
    setAppeals((prev) =>
      prev.map((appeal) => (appeal.id === id ? response.data : appeal))
    );
    showAlert("Обращение отправлено в работу", "success");
  };

  return appeals.length ? (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Дата</th>
          <th>Статус</th>
          <th>Тема</th>
          <th>Описание</th>
          <th>Решение</th>
          <th>Причина отмены</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {appeals.map((appeal) => (
          <tr
            key={appeal.id}
            className={
              appeal.status === "new"
                ? styles.rowNew
                : appeal.status === "work"
                ? styles.rowWork
                : appeal.status === "finish"
                ? styles.rowDone
                : appeal.status === "cancel"
                ? styles.rowCancel
                : ""
            }>
            <td>{new Date(appeal.createdAt).toLocaleDateString()}</td>
            <td>{statusLabels[appeal.status]}</td>
            <td>{appeal.topic}</td>
            <td>{appeal.description}</td>
            <td>{appeal.solution || "-"}</td>
            <td>{appeal.cancel_reason || "-"}</td>

            <td>
              <div className={styles.actions}>
                {appeal.status === "new" && (
                  <button onClick={() => handleToWork(appeal.id)}>
                    В работу
                  </button>
                )}
                {appeal.status === "work" && (
                  <>
                    <button onClick={() => openModal("finish", appeal.id)}>
                      ✅
                    </button>
                    <button onClick={() => openModal("cancel", appeal.id)}>
                      ❌
                    </button>
                  </>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <h1>Обращений нет</h1>
  );
}
