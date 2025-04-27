import "./App.css";
import CreatingForm from "./components/CreatingForm/CreatingForm";
import Button from "./components/ui/Button/Button";
import Modal from "./components/Modal/Modal";
import Table from "./components/Table/Table";
import { useContext } from "react";
import { appealsContext } from "./context/context";
import Filters from "./components/Filters/Filters";
import axios from "axios";
import EditForm from "./components/EditForm/EditForm";
import { useAlert } from "./context/alertContext";

const { VITE_API, VITE_BASE_URL } = import.meta.env;

function App() {
  const { modal, openModal, setAppeals, appeals } = useContext(appealsContext);
  const { showAlert } = useAlert();

  const cancelAllWork = async () => {
    const hasWorkAppeals = appeals.some((appeal) => appeal.status === "work");
    if (!hasWorkAppeals) {
      showAlert("Нет обращений в работе для отмены", "error");
      return;
    } else {
      await axios.patch(`${VITE_BASE_URL}/${VITE_API}`);
      setAppeals((prev) =>
        prev.map((appeal) =>
          appeal.status === "work" ? { ...appeal, status: "cancel" } : appeal
        )
      );
      showAlert("Все обращения отменены", "success");
    }
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
      <Modal isOpen={modal.type !== null}>
        {modal.type === "create" && <CreatingForm />}
        {(modal.type === "cancel" || modal.type === "finish") && (
          <EditForm type={modal.type} />
        )}
      </Modal>
    </>
  );
}

export default App;
