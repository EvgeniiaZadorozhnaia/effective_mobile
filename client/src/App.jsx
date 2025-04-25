import "./App.css";
import CreatingForm from "./components/CreatingForm/CreatingForm";
import Button from "./components/ui/Button/Button";
import Modal from "./components/Modal/Modal";
import Table from "./components/Table/Table";
import { useContext } from "react";
import { appealsContext } from "./context/context";
import CancelForm from "./components/CancelForm/CancelForm";
import FinishForm from "./components/FinishForm/FinishForm";
import Filters from "./components/Filters/Filters";
import axios from "axios";

const { VITE_API, VITE_BASE_URL } = import.meta.env;

function App() {
  const { modal, openModal, closeModal, setAppeals } =
    useContext(appealsContext);

  const cancelAllWork = async () => {
    await axios.patch(`${VITE_BASE_URL}/${VITE_API}`);
    setAppeals((prev) =>
      prev.map((appeal) =>
        appeal.status === "work" ? { ...appeal, status: "cancel" } : appeal
      )
    );
  };

  return (
    <>
      <div className="header">
        <Filters />
        <div className="btns">
          <Button onClick={() => openModal("create")}>
            Создать новое обращение
          </Button>
          <Button onClick={cancelAllWork}>Отменить все в работе</Button>
        </div>
      </div>

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
