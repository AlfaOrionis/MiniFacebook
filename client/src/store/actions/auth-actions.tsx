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
  gender: string;
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
          firstname: values.firstname,
          lastname: values.lastname,
          birthday: values.birthday,
          gender: values.gender,
        }
      );

      dispatch(
        authActions.userAuthenticate({
          isAuth: true,
          data: response.data.user,
        })
      );
    } catch (err) {
      console.log(err);
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
