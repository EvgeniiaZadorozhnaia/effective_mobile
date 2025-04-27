import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AppealsProvider } from "./context/context.jsx";
import { AlertProvider } from "./context/alertContext.jsx";

createRoot(document.getElementById("root")).render(
  <AlertProvider>
    <AppealsProvider>
      <App />
    </AppealsProvider>
  </AlertProvider>
);
