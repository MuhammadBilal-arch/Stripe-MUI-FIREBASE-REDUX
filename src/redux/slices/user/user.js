import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLogged: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    onStoreUserData: (state, action) => {
      state.user = action.payload;
      state.isLogged = true;
    },
    onLogoutUserData: (state, action) => {
      state.user = {};
      state.isLogged = false;
    },
  },
  extraReducers: (builder) => {},
});

export const { onStoreUserData , onLogoutUserData } = userSlice.actions;

export default userSlice.reducer;
