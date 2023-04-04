import axios, { AxiosResponse } from "axios";
import { AppDispatch } from "../index";

import { authActions } from "../slices/auth-slice";
import { notificationActions } from "../slices/notification-slice";
interface userRegisterProps {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  birthday: string;
  gender: "male" | "female";
}

interface userResponse {
  user: {
    email: string;
    firstname: string;
    lastname: string;
    birthday: string;
    gender: "male" | "female";
    verified: boolean;
    friends: string[];
    friendsRequest: string[];
  };
}

interface logInProps {
  email: string;
  password: string;
}

export const userRegister = (values: userRegisterProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response: AxiosResponse<userResponse> = await axios.post(
        "/api/auth/register",
        {
          email: values.email,
          password: values.password,
          firstname: "Kola",
          lastname: "Banda",
          birthday: "2007-03-22",
          gender: "male",
        }
      );

      dispatch(
        authActions.userAuthenticate({
          isAuth: true,
          data: response.data.user,
        })
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
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

export const logIn = (values: logInProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response: AxiosResponse<userResponse> = await axios.post(
        "/api/auth/signin",
        {
          email: values.email,
          password: values.password,
        }
      );
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
            title: "SignIn error",
            message: err.response!.data.message || "Something went wrong",
          })
        );
      }
    }
  };
};
