import { createSlice } from "@reduxjs/toolkit";
import { User, notification } from "../../types/types";

interface initialData {
  email: string;
  firstname: string;
  lastname: string;
  birthday: string;
  gender: "male" | "female" | "";
  verified: boolean;
  friends?: string[];
  friendsRequest?: { started: boolean; _id: string }[] | [];
  _id?: string;
  notifications: [] | notification[];
  notificationsChecked: boolean;
}
export interface initialState {
  isAuth: boolean;
  data: initialData | User;
}

export const initialAuthState: initialState = {
  isAuth: false,
  data: {
    email: "",
    firstname: "",
    lastname: "",
    birthday: "",
    gender: "",
    verified: false,
    friends: [],
    friendsRequest: [],
    notifications: [],
    notificationsChecked: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    userAuthenticate(state, action: { payload: initialState }) {
      state.isAuth = action.payload.isAuth;
      state.data = action.payload.data;
    },
    userNotifications(state, action: { payload: notification[] | [] }) {
      state.isAuth = state.isAuth;
      state.data = {
        ...state.data,
        notifications: action.payload,
      };
    },
    userNotifChecked(state, action: { payload: boolean }) {
      state.data.notificationsChecked = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
