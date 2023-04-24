import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toast: {},
  isEnabled: false,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,

  reducers: {
    onShowToast: (state, action) => {
      state.toast = action.payload;
      state.isEnabled = true;
    },
    onHideToast: (state, action) => {
      state.toast = action.payload;
      state.isEnabled = false;
    },
  },
  extraReducers: (builder) => {},
});

export const { onShowToast, onHideToast } = toastSlice.actions;

export default toastSlice.reducer;
