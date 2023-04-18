import { useEffect, useRef, useState } from "react";
import {
  BackSVG,
  FbSVG,
  GroupsSVG,
  HomeSVG,
  MarketPlaceSVG,
  MessengerSVG,
  MoreSVG,
  NotificationSVG,
  SearchSVG,
  WatchSVG,
} from "../../../utills/svg";
import styles from "./HomeHeader.module.css";
import axios from "axios";
import { useAppDispatch } from "../../../store";
import { notificationActions } from "../../../store/slices/notification-slice";
import { boldTypedLetter } from "../../../utills/tools";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "../../../utills/spinner";
import { logOut } from "../../../store/actions/auth-actions";
const HomeHeader: React.FC<{
  user_id: string;
  isFocused: boolean;
  handleFocus: (val: boolean) => void;
}> = ({ isFocused, handleFocus, user_id }) => {
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusOnInput = () => {
    inputRef.current!.focus();
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setInputValue(e.target.value);
  };
  console.log(isFocused);
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "/api/users/users?input=" + inputValue + "&limit=" + 7
      );
      setUsers(response.data);
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
  console.log(users);

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
                  {users.map(
                    (user: {
                      firstname: string;
                      lastname: string;
                      _id: string;
                    }) => {
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
                    }
                  )}
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
        <div className={styles.SVGContainer}>
          <NotificationSVG />
        </div>
        <button
          onClick={() => {
            dispatch(logOut());
            navigate("/");
          }}
        >
          Logout
        </button>
        <Link to={`profile/${user_id}/`} className={styles.profileContainer}>
          <img
            alt="Account"
            src="https://i.wpimg.pl/O/1280x720/d.wpimg.pl/1292000565-1150296623/wiedzmin-wiedzmin-netflix.jpg"
          />
        </Link>
      </div>
    </div>
  );
};

export default HomeHeader;
