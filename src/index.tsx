import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import store, { persistor } from "./redux/store/store";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CalendarProvider } from "./context/Calendar";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CalendarProvider>
          <App />
        </CalendarProvider>
      </LocalizationProvider>
    </PersistGate>
  </Provider>
);
