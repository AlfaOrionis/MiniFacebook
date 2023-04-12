import axios, { AxiosResponse } from "axios";
import { AppDispatch } from "../index";

import { authActions } from "../slices/auth-slice";
import { notificationActions } from "../slices/notification-slice";
import { User } from "../../types/types";
interface userRegisterProps {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  birthday: string;
  gender: string;
}

interface userResponse {
  user: User;
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
      dispatch(
        notificationActions.showNotification({
          status: "success",
          message: "Check your email to verify account!",
        })
      );
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        dispatch(
          notificationActions.showNotification({
            status: "error",
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
      return true;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response!.data.message);
        dispatch(
          notificationActions.showNotification({
            status: "error",
            message: err.response!.data.message || "Something went wrong",
          })
        );
      }
    }
  };
};
