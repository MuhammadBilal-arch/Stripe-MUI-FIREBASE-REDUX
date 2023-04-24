import React from "react";
import { BrowserRouter } from "react-router-dom";
import { RoutesHandler } from "./routes";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { Alert, Snackbar } from "@mui/material";
import { onHideToast } from "./redux/slices/toast";

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <RoutesHandler />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};
