import { createContext, useCallback, useContext, useState } from "react";
import Alert from "../components/ui/Alert/Alert";

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState({ message: "", type: "" });

  const showAlert = useCallback((message, type) => {
    setAlert({ message, type });

    setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, 3000);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert.message && <Alert message={alert.message} type={alert.type} />}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}
