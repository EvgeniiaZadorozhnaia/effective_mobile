import "./App.css";
import CreatingForm from "./components/CreatingForm/CreatingForm";
import Button from "./components/ui/Button/Button";
import Modal from "./components/Modal/Modal";
import Table from "./components/Table/Table";
import { useContext } from "react";
import { appealsContext } from "./context/context";
import CancelForm from "./components/CancelForm/CancelForm";
import FinishForm from "./components/FinishForm/FinishForm";

function App() {
  const context = useContext(appealsContext);
  const { modal, openModal, closeModal } = context;

  return (
    <>
      <Button onClick={() => openModal("create")}>
        Создать новое обращение
      </Button>
      <Table />
      <Modal isOpen={modal.type !== null} onClose={closeModal}>
        {modal.type === "create" && <CreatingForm onClose={closeModal} />}
        {modal.type === "cancel" && <CancelForm onClose={closeModal} />}
        {modal.type === "finish" && <FinishForm onClose={closeModal} />}
      </Modal>
    </>
  );
}

export default App;
