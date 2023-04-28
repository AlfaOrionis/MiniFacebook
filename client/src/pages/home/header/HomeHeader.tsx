import { useEffect, useRef, useState } from "react";
import {
  BackSVG,
  CancelSVG,
  FbSVG,
  GroupsSVG,
  HomeSVG,
  LogOutSVG,
  MarketPlaceSVG,
  MessengerSVG,
  MoreSVG,
  NotificationSVG,
  SearchSVG,
  WatchSVG,
} from "../../../utills/svg";
import styles from "./HomeHeader.module.css";
import axios, { AxiosResponse } from "axios";
import { useAppDispatch } from "../../../store";
import { notificationActions } from "../../../store/slices/notification-slice";
import { boldTypedLetter, getTokenCookie } from "../../../utills/tools";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "../../../utills/spinner";
import { logOut } from "../../../store/actions/auth-actions";
import { User } from "../../../types/types";
import { authActions, initialState } from "../../../store/slices/auth-slice";
const HomeHeader: React.FC<{
  user: initialState;
  isFocused: boolean;
  handleFocus: (val: boolean) => void;
}> = ({ isFocused, handleFocus, user }) => {
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  console.log(user);
  console.log("HOME HEADER PRZELADOWANIE");
  const focusOnInput = () => {
    inputRef.current!.focus();
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setInputValue(e.target.value);
  };

  const openNotificationsHandler = () => {
    if (!user.data.notificationsChecked) {
      axios
        .patch(
          "/api/users/setNotifTrue",
          {},
          {
            headers: { Authorization: `Bearer ${getTokenCookie()}` },
          }
        )
        .then((res: AxiosResponse<User>) =>
          dispatch(authActions.userNotifChecked(res.data.notificationsChecked))
        )
        .catch((err) => console.log(err));
    }
    setShowNotif(true);
  };
  const closeNotificationsHandler = () => {
    setShowNotif(false);
  };

  const fetchUsers = async () => {
    try {
      const response: AxiosResponse<User[]> = await axios.get(
        "/api/users/users?input=" + inputValue + "&limit=" + 7
      );
      console.log(response);
      setUsers(response.data.filter((u) => u._id !== user.data._id));
    } catch (err) {
      if (axios.isAxiosError(err))
        dispatch(
          notificationActions.showNotification({
            status: "error",
            message: err.response!.data.message || "Something went wrong",
          })
        );
    }
    setIsLoading(false);
  };

  const removeNotification = (_id: string) => {
    axios
      .patch(
        "/api/users/removeNotification",
        {
          _id,
        },
        {
          headers: { Authorization: `Bearer ${getTokenCookie()}` },
        }
      )
      .then((res) => {
        return dispatch(authActions.userNotifications(res.data.notifications));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(inputValue.trim().length);
      if (inputValue.trim().length > 0) {
        fetchUsers();
      } else setUsers([]);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <div className={styles.HomeHeader}>
      <div className={styles.HomeHeader__left}>
        {isFocused && (users.length > 0 || inputValue.trim().length > 0) && (
          <div
            onClick={() => {
              handleFocus(false);
            }}
            className={styles.backSVG}
          >
            <BackSVG />
          </div>
        )}
        <div className={styles.HomeHeader__searchInputContainer}>
          <FbSVG
            onClick={() => {
              navigate("/home");
            }}
          />
          <input
            ref={inputRef}
            style={!isFocused ? { paddingLeft: "33px" } : { width: "250px" }}
            value={inputValue}
            onChange={inputHandler}
            onFocus={() => handleFocus(true)}
            onBlur={() => !searchFocused && handleFocus(false)}
          />
          {!isFocused && (
            <SearchSVG onClick={focusOnInput} className="searchPlaceholder" />
          )}

          {isFocused && (users.length > 0 || inputValue.trim().length > 0) && (
            <div
              onMouseLeave={() => {
                setSearchFocused(false);
              }}
              onMouseEnter={() => {
                setSearchFocused(true);
              }}
              className={`${styles.HomeHeader__usersListContainer}`}
            >
              {users.length > 0 ? (
                <ul>
                  {users.map((user: User) => {
                    return (
                      <li key={user._id}>
                        <Link to={"/profile/" + user._id + "/"}>
                          <div className={styles.SVGContainer}>
                            <SearchSVG />
                          </div>
                          <p style={{ fontWeight: "bold" }}>
                            {boldTypedLetter(
                              inputValue,
                              `${user.firstname} ${user.lastname}`
                            )}
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className={styles.noUsersFound}>
                  {isLoading ? <Spinner /> : <p>No users found.</p>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={styles.HomeHeader__middle}>
        <ul>
          <li>
            <HomeSVG />
          </li>
          <li>
            <WatchSVG />
          </li>
          <li>
            <MarketPlaceSVG />
          </li>
          <li>
            <GroupsSVG />
          </li>
          <li>
            <MoreSVG />
          </li>
        </ul>
      </div>
      <div className={styles.HomeHeader__right}>
        <div className={styles.SVGContainer}>
          <MessengerSVG />
        </div>
        <div className={styles.notWrapper}>
          <div
            onClick={openNotificationsHandler}
            className={`${styles.SVGContainer} ${styles.notContainer}`}
          >
            <NotificationSVG />
            {!user.data.notificationsChecked &&
              user.data.notifications.length > 0 && (
                <div className={styles.notContainer__number}>
                  {user.data.notifications.length}
                </div>
              )}
          </div>
          {showNotif && (
            <div className={styles.notList}>
              <h2>Notifications</h2>
              {user.data.notifications.length > 0 ? (
                <ul>
                  {user.data.notifications
                    .slice()
                    .reverse()
                    .map((not) => {
                      const time = new Date(not.date).getTime();
                      const now = new Date().getTime();
                      const diffMinutes = Math.round((now - time) / 60000);
                      const theTime = () => {
                        if (diffMinutes >= 10080) {
                          return `${Math.floor(diffMinutes / 10080)} weeks ago`;
                        } else if (diffMinutes >= 1440) {
                          return `${Math.floor(diffMinutes / 1440)} days ago`;
                        } else if (diffMinutes >= 60) {
                          return `${Math.floor(diffMinutes / 60)} hours ago`;
                        } else return `${diffMinutes} minutes ago`;
                      };
                      return (
                        <li key={not.date.toString()}>
                          <div
                            onClick={() => {
                              navigate(`/profile/${not._id}`);
                              setShowNotif(false);
                            }}
                          >
                            <div>
                              <img src={not.friend.img} />
                            </div>
                            <div>
                              <p>
                                <span>{not.friend.name}</span>{" "}
                                {not.category === "newFriend"
                                  ? `accepted your
                              friend request.`
                                  : `sent you a friend request`}
                              </p>
                              <span>{theTime()}</span>
                            </div>
                          </div>
                          <button onClick={() => removeNotification(not._id)}>
                            <CancelSVG />
                          </button>
                        </li>
                      );
                    })}
                </ul>
              ) : (
                <p style={{ textAlign: "center", fontWeight: "bold" }}>
                  Its empty.
                </p>
              )}
            </div>
          )}
          {showNotif && (
            <div className="backdrop" onClick={closeNotificationsHandler}></div>
          )}
        </div>
        <div
          className={styles.SVGContainer}
          onClick={() => {
            dispatch(logOut());
            navigate("/");
          }}
        >
          <LogOutSVG />
        </div>
        <Link
          to={`profile/${user.data._id}/`}
          className={styles.profileContainer}
        >
          <img alt="Account" src={user.data.profilePicture} />
        </Link>
      </div>
    </div>
  );
};

export default HomeHeader;
