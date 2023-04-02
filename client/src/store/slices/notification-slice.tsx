import { createSlice } from "@reduxjs/toolkit";

interface notificationState {
  status: "error" | "success" | null;
  title: string;
  message: string;
}

const notificationState: notificationState = {
  status: null,
  title: "",
  message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationState,
  reducers: {
    showNotification(state, action: { payload: notificationState }) {
      state = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
      return state;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice.reducer;
