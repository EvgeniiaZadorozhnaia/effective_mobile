import "./App.css";
import CreatingForm from "./components/CreatingForm/CreatingForm";
import { useState } from "react";
import Button from "./components/ui/Button/Button";
import Modal from "./components/Modal/Modal";

function App() {
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };
  
  return (
    <>
      <Button onClick={() => openModal("create")}>
        Создать новое обращение
      </Button>
      <Modal isOpen={modalType !== null} onClose={closeModal}>
        {modalType === "create" && <CreatingForm onClose={closeModal} />}
      </Modal>
    </>
  );
}

export default App;
