import styles from "./profile.module.css";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { User } from "../../types/types";
import { Spinner } from "../../utills/spinner";
import { AddUserSVG, MessengerSVG, MoreSVG } from "../../utills/svg";
import { Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Posts from "./postsRoute/posts";
import About from "./aboutRoute/about";
import { useAppSelector } from "../../store";
import { getTokenCookie } from "../../utills/tools";

const Profile: React.FC<{ handleFocus: (val: boolean) => void }> = ({
  handleFocus,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLoadingFriendReq, setIsLoadingFriendReq] = useState(false);

  const navigate = useNavigate();

  const setUserHandler = (data: User) => {
    setUser(data);
  };
  const wasFriendRequestSend = () => {
    if (user) {
      return user.friendsRequest.find((req) => req._id === mySelf.data._id);
    }
  };
  const isItMyFriend = () => {
    if (user) {
      return user.friends.find((id) => id === mySelf.data._id);
    }
    return false;
  };
  const friendHandler = () => {
    setIsLoadingFriendReq(true);

    axios
      .post(
        "/api/users/sendFriendRequest",
        {
          _id: user?._id,
        },
        {
          headers: { Authorization: `Bearer ${getTokenCookie()}` },
        }
      )
      .then((res) => {
        setIsLoadingFriendReq(false);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingFriendReq(false);
      });
  };
  const mySelf = useAppSelector((state) => state.auth);
  const params = useParams<{ _id: string }>();

  console.log(isItMyFriend());
  useEffect(() => {
    axios
      .get("/api/users/profile?_id=" + params._id)
      .then((res: AxiosResponse<User>) => {
        setUserHandler(res.data);
        setIsLoadingProfile(false);
        handleFocus(false);
      })
      .catch((err) => {
        setIsLoadingProfile(false);
        handleFocus(false);
        console.log(err);
      });
  }, [params._id]);

  if (user && !isLoadingProfile) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.topContainer}>
          <div className={styles.backgroundContainer}>
            <img
              src={
                "https://motobanda.pl/uploads/motors/140/kawasaki-z800-18_nJQ57.jpg"
              }
            />
          </div>
          <div className={styles.avatarContainer}>
            <div className={styles.avatarContainer__leftContainer}>
              <div className={styles.avatarIMG}>
                <img
                  src={
                    "https://motobanda.pl/uploads/motors/140/kawasaki-z800-18_nJQ57.jpg"
                  }
                />
              </div>
              <div className={styles.nameContainer}>
                <p>
                  {user.firstname} {user.lastname}
                </p>
                <span>{user.friends ? user.friends.length : 0} friends</span>
                <div>adw awd awd awd a wda</div>
              </div>
            </div>
            <div className={styles.avatarContainer__rightContainer}>
              {user._id === mySelf.data._id ? (
                <div>
                  <Button>Add to story</Button>
                  <Button onClick={() => navigate("about")}>
                    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tmaz0VO75BB.png" />
                    Edit profile
                  </Button>
                </div>
              ) : (
                <div>
                  {
                    <Button
                      className={styles.addFriendBtn}
                      onClick={friendHandler}
                    >
                      {isLoadingFriendReq ? (
                        <Spinner className={styles.btnSpinner} />
                      ) : (
                        <AddUserSVG />
                      )}
                      {!wasFriendRequestSend() ? (
                        <span> Add friend</span>
                      ) : (
                        <span>Cancel Request</span>
                      )}
                    </Button>
                  }

                  <Button>
                    <MessengerSVG /> Message
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.borderBottom}></div>
          <div className={styles.navContainer}>
            <ul>
              <li>
                <NavLink
                  className={(link) => (link.isActive ? styles.activeLink : "")}
                  to={`/profile/${params._id}/`}
                >
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(link) => (link.isActive ? styles.activeLink : "")}
                  to={`/profile/${params._id}/about`}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(link) => (link.isActive ? styles.activeLink : "")}
                  to={`/profile/${params._id}/friends`}
                >
                  Friends
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(link) => (link.isActive ? styles.activeLink : "")}
                  to={`/profile/${params._id}/photos`}
                >
                  Photos
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(link) => (link.isActive ? styles.activeLink : "")}
                  to={`/profile/${params._id}/more`}
                >
                  More
                </NavLink>
              </li>
            </ul>
            <div className={styles.MoreSVG}>
              <MoreSVG />
            </div>
          </div>
        </div>
        <div className={styles.bottomContainerWrapper}>
          <div className={styles.bottomContainer}>
            <Routes>
              <Route
                path="/about"
                element={<About setUserHandler={setUserHandler} user={user} />}
              />
              <Route
                path="/*"
                element={
                  <>
                    <Posts setUserHandler={setUserHandler} user={user} />
                  </>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    );
  } else if (!user && !isLoadingProfile)
    return <div>This content isn't available at the moment</div>;
  else
    return (
      <div
        style={{
          cursor: "wait",
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: "10000000",
        }}
      ></div>
    );
};

export default Profile;
