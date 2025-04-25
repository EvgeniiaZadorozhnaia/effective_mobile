import React, { useState, useContext } from "react";
import Button from "../ui/Button/Button";
import axios from "axios";
import { appealsContext } from "../../context/context";
import styles from "./Filters.module.css";

const { VITE_API, VITE_BASE_URL } = import.meta.env;

export default function Filters() {
  const [filters, setFilters] = useState({
    date: "",
    startDate: "",
    endDate: "",
  });
  const { setAppeals } = useContext(appealsContext);

  const fetchAppeals = async (activeFilters = filters) => {
    try {
      const params = {};
      if (activeFilters.date) params.date = activeFilters.date;
      if (activeFilters.startDate && activeFilters.endDate) {
        params.startDate = activeFilters.startDate;
        params.endDate = activeFilters.endDate;
      }

      const response = await axios.get(`${VITE_BASE_URL}/${VITE_API}`, {
        params,
      });
      setAppeals(response.data);
    } catch (error) {
      console.error("Error fetching filtered appeals:", error);
    }
  };

  const applyFilters = () => {
    fetchAppeals(filters);
  };

  const cancelFilter = () => {
    const cleared = { date: "", startDate: "", endDate: "" };
    setFilters(cleared);
    fetchAppeals(cleared); // передаём очищенные фильтры вручную
  };

  return (
    <div className={styles.filters}>
      <h2>Поиск по дате</h2>

      <div className={styles.inputGroup}>
        <label htmlFor="exactDate">Точная дата</label>
        <input
          id="exactDate"
          type="date"
          value={filters.date}
          onChange={(e) =>
            setFilters({
              ...filters,
              date: e.target.value,
              startDate: "",
              endDate: "",
            })
          }
        />
      </div>

      <div className={styles.inputRow}>
        <div className={styles.inputGroup}>
          <label htmlFor="startDate">С</label>
          <input
            id="startDate"
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value, date: "" })
            }
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="endDate">По</label>
          <input
            id="endDate"
            type="date"
            value={filters.endDate}
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value, date: "" })
            }
          />
        </div>
      </div>

      <div className={styles.buttonRow}>
        <Button onClick={applyFilters}>Применить фильтры</Button>
        <Button onClick={cancelFilter}>Сбросить</Button>
      </div>
    </div>
  );
}
