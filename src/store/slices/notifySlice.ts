import { createSlice } from "@reduxjs/toolkit";

export const notifySlice = createSlice({
  name: "notify",
  initialState: {
    isNotify: false,
    message: "",
  },
  reducers: {
    create: (state, action) => {
      state.isNotify = true;
      state.message = action.payload.message;
      return state;
    },
    remove: (state) => {
      state.isNotify = false;
      state.message = "";
      return state;
    },
  },
});

export const { create, remove } = notifySlice.actions;

export default notifySlice.reducer;
