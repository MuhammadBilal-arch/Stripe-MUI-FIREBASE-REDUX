import React from "react";
import { Route, Routes } from "react-router-dom";
import { Auth } from "../container/auth";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { onHideToast } from "../redux/slices/toast";
import { Home } from "../container/home";

export const RoutesHandler = () => {
  const { toast, isEnabled } = useSelector((state) => state.Toast);
  const dispatch = useDispatch();

  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Snackbar
        open={isEnabled}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        onClose={() => dispatch(onHideToast())}
      >
        <Alert severity={toast?.type}>{toast?.text}</Alert>
      </Snackbar>
    </>
  );
};
