import { combineReducers } from "@reduxjs/toolkit";
import UserSlice from "./slices/user/user";
import toastSlice from "./slices/toast";

export const rootReducer = combineReducers({
  Toast: toastSlice,
  User: UserSlice,
});
