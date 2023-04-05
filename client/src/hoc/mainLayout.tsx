import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { showToast } from "../utills/tools";
import "react-toastify/dist/ReactToastify.css";
import { RootState, useAppDispatch, useAppSelector } from "../store";
import { notificationActions } from "../store/slices/notification-slice";
interface Props {
  children: React.ReactNode;
}
const MainLayout: React.FC<Props> = ({ children }) => {
  const notifications = useAppSelector((state) => state.notifications);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (notifications.status === "error") {
      showToast("ERROR", notifications.message || "Something went wrong");
      dispatch(notificationActions.notifClear());
    }

    if (notifications.status === "success") {
      showToast("SUCCESS", notifications.message || "Something went wrong");
      dispatch(notificationActions.notifClear());
    }
  }, [notifications.status]);
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default MainLayout;
