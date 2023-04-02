import axios, { AxiosError } from "axios";
import { AppDispatch } from "../index";

import { authActions } from "../slices/auth-slice";
import { notificationActions } from "../slices/notification-slice";
interface userRegisterProps {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  birthday: string;
  gender: string;
}

interface logIn {
  email: string;
  password: string;
}

export const userRegister = (values: userRegisterProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post("/api/auth/register", {
        email: values.email,
        password: values.password,
        firstname: "Kola",
        lastname: "Banda",
        birthday: "2007-03-22",
        gender: "male",
      });

      dispatch(
        authActions.userAuthenticate({
          isAuth: true,
          data: response.data.user,
        })
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response!.data.message);
        dispatch(
          notificationActions.showNotification({
            status: "error",
            title: "Register error",
            message: err.response!.data.message || "Something went wrong",
          })
        );
      }
    }
  };
};

export const logIn = (values: logIn) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post("/api/auth/signin", {
        email: values.email,
        password: values.password,
      });
      console.log(response.data.user);
      dispatch(
        authActions.userAuthenticate({
          isAuth: true,
          data: response.data.user,
        })
      );
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        console.log(err.response!.data.message);
        dispatch(
          notificationActions.showNotification({
            status: "error",
            title: "SignIn error",
            message: err.response!.data.message || "Something went wrong",
          })
        );
      }
    }
  };
};
