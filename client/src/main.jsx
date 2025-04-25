import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AppealsProvider } from "./context/context.jsx";

createRoot(document.getElementById("root")).render(
  <AppealsProvider>
    <App />
  </AppealsProvider>
);
