import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import theme from "./utils/theme.js";
import { ThemeProvider } from "@mui/material";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Toaster } from "react-hot-toast";

const rootElement = document.getElementById("root");
rootElement.className = "min-h-full text-slate-100";

const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

const paypalOptions = {
  clientId: paypalClientId,
  currency: "EUR",
  intent: "capture",
  "disable-funding": "card",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <PayPalScriptProvider options={paypalOptions}>
        <BrowserRouter>
          <App />
          <Toaster position="top-right" />
        </BrowserRouter>
      </PayPalScriptProvider>
    </ThemeProvider>
  </Provider>,
);
