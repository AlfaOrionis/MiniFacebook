import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  isAuth: boolean;
  data: {
    email: string;
    firstname: string;
    lastname: string;
    birthday: string;
    gender: "male" | "female" | "";
    verified: boolean;
    friends?: string[];
    friendsRequest?: string[];
  };
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
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
