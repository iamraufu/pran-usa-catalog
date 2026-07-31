import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

import { OrderProvider } from "./context/OrderContext.jsx";
import { SettingsProvider } from "./context/SettingsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SettingsProvider>
    <OrderProvider>
      <App />
    </OrderProvider>
  </SettingsProvider>,
);
