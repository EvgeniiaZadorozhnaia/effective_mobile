import React, { useEffect, useContext } from "react";
import axios from "axios";
import styles from "./Table.module.css";
import { appealsContext } from "../../context/context";

const { VITE_API, VITE_BASE_URL } = import.meta.env;

export default function Table() {
  const context = useContext(appealsContext);
  const { appeals, setAppeals, openModal } = context;

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
  };

  return (
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
          <tr key={appeal.id}>
            <td>{new Date(appeal.createdAt).toLocaleDateString()}</td>
            <td>{appeal.status}</td>
            <td>{appeal.topic}</td>
            <td>{appeal.description}</td>
            <td>{appeal.solution || "-"}</td>
            <td>{appeal.cancel_reason || "-"}</td>

            <td>
              {appeal.status === "new" && (
                <button onClick={() => handleToWork(appeal.id)}>
                  В работу
                </button>
              )}
              {appeal.status === "work" && (
                <>
                  <button onClick={() => openModal("finish", appeal.id)}>
                    Завершить
                  </button>
                  <button onClick={() => openModal("cancel", appeal.id)}>
                    Отменить
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
