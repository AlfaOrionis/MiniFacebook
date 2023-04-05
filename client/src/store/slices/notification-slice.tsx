import { createSlice } from "@reduxjs/toolkit";

interface notificationState {
  status: "error" | "success" | null;
  message: string;
}

const notifInitialState: notificationState = {
  status: null,
  message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: notifInitialState,
  reducers: {
    showNotification(state, action: { payload: notificationState }) {
      state = {
        status: action.payload.status,
        message: action.payload.message,
      };
      return state;
    },
    notifClear() {
      return notifInitialState;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice.reducer;
