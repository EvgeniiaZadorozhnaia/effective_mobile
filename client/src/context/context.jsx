import { createContext } from "react";
import { useState } from "react";

export const appealsContext = createContext();

export const AppealsProvider = ({ children }) => {
  const [appeals, setAppeals] = useState([]);
  const [modal, setModal] = useState({ type: null, id: null });
 

  const openModal = (type, id) => {
    setModal({ type, id });
  };

  const closeModal = () => {
    setModal({ type: null, id: null });
  };

  return (
    <appealsContext.Provider
      value={{
        appeals,
        setAppeals,
        modal,
        setModal,
        openModal,
        closeModal,
      }}>
      {children}
    </appealsContext.Provider>
  );
};
