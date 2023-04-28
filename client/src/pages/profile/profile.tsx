import styles from "./profile.module.css";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { User, friend } from "../../types/types";
import { Spinner } from "../../utills/spinner";
import {
  AddUserSVG,
  MessengerSVG,
  MoreSVG,
  RespondFriendSVG,
} from "../../utills/svg";
import { Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Posts from "./postsRoute/posts";
import About from "./aboutRoute/about";
import { useAppSelector } from "../../store";
import { getTokenCookie } from "../../utills/tools";
import Backdrop from "../../utills/backdrop";
import AddPictureModal from "../../components/AddPictureModal";

const Profile: React.FC<{ handleFocus: (val: boolean) => void }> = ({
  handleFocus,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLoadingFriendReq, setIsLoadingFriendReq] = useState(false);
  const [showRespond, setShowRespond] = useState(false);
  const [showRemoveFriend, setShowRemoveFriend] = useState(false);
  const [showPictureModal, setShowPictureModal] = useState(false);

  const navigate = useNavigate();

  const mySelf = useAppSelector((state) => state.auth);

  const setUserHandler = (data: User) => {
    setUser(data);
  };
  const wasFriendRequestSend =
    user && user.friendsRequest.find((req) => req._id === mySelf.data._id);

  // const getUserFriends = () => {
  //   axios
  //     .get("/api/users/userFriends", {
  //       headers: { Authorization: `Bearer ${getTokenCookie()}` },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

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
  const confirmRequestHandler = () => {
    axios
      .post(
        "/api/users/confirmFriendRequest",
        {
          _id: user!._id,
        },
        {
          headers: { Authorization: `Bearer ${getTokenCookie()}` },
        }
      )
      .then((res: AxiosResponse<{ friend: User; user: User }>) => {
        setShowRespond(false);
        setUser(res.data.friend);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const removeFriend = () => {
    axios
      .post(
        "/api/users/removeFriend",
        {
          _id: user!._id,
        },
        { headers: { Authorization: `Bearer ${getTokenCookie()}` } }
      )
      .then((res: AxiosResponse<{ friend: User; user: User }>) =>
        setUser(res.data.friend)
      )
      .catch((err) => console.log(err));
  };
  const openPictureModal = () => {
    setShowPictureModal(true);
  };

  const closePictureModal = () => {
    setShowPictureModal(false);
  };
  const openAddFriendHandler = () => {
    setShowRespond(true);
  };
  const closeAddFriendHandler = () => {
    setShowRespond(false);
  };
  const openRemoveFriendHandler = () => {
    setShowRemoveFriend(true);
  };
  const closeRemoveFriendHandler = () => {
    setShowRemoveFriend(false);
  };

  const params = useParams<{ _id: string }>();

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
  const isItMyFriend =
    user &&
    user.friends.find((friend: friend) => {
      return friend._id === mySelf.data._id;
    });

  const friendState = () => {
    if (!wasFriendRequestSend) {
      console.log("XDDDDDDDDDDDDDDDDD");
      if (isItMyFriend) return "friend";
      return "emptyOrStarted";
    } else if (wasFriendRequestSend && !wasFriendRequestSend.started) {
      return "emptyOrStarted";
    } else if (wasFriendRequestSend && wasFriendRequestSend.started) {
      return "started";
    }
  };
  if (user && !isLoadingProfile) {
    return (
      <div className={styles.profileContainer}>
        <AddPictureModal
          showPictureModal={showPictureModal}
          closePictureModal={closePictureModal}
        />
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
              <div onClick={openPictureModal} className={styles.avatarIMG}>
                <img
                  src={
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                />
              </div>
              <div className={styles.nameContainer}>
                <p>
                  {user.firstname} {user.lastname}
                </p>
                <span>{user.friends ? user.friends.length : 0} friends</span>
                <div className={styles.friendsContainer}>
                  {user.friends.length > 0 ? (
                    <ul>
                      {user.friends.slice(0, 7).map((fr: any) => (
                        <li key={fr._id}>
                          <Link to={"/profile/" + fr._id + "/"}>
                            <img src={fr.profilePicture} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "XD"
                  )}
                </div>
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
                  {friendState() === "emptyOrStarted" && (
                    <Button
                      className={styles.addFriendBtn}
                      onClick={friendHandler}
                    >
                      {isLoadingFriendReq ? (
                        <Spinner className={styles.btnSpinner} />
                      ) : (
                        <AddUserSVG />
                      )}
                      {!wasFriendRequestSend ? (
                        <span> Add friend</span>
                      ) : (
                        <span>Cancel Request</span>
                      )}
                    </Button>
                  )}
                  {friendState() === "started" && (
                    <div className={styles.respondBtnContainer}>
                      <Button onClick={openAddFriendHandler}>
                        <RespondFriendSVG />
                        Respond
                      </Button>
                      {showRespond && (
                        <div className={styles.respondBtnContainer__div}>
                          <button onClick={confirmRequestHandler}>
                            Confirm
                          </button>
                          <button onClick={friendHandler}>
                            Remove request
                          </button>
                        </div>
                      )}
                      {showRespond && (
                        <Backdrop onClick={closeAddFriendHandler} />
                      )}
                    </div>
                  )}
                  {friendState() === "friend" && (
                    <div className={styles.respondBtnContainer}>
                      <Button
                        style={
                          isItMyFriend
                            ? {
                                color: "black",
                                backgroundColor: "rgb(229, 229, 229)",
                              }
                            : {}
                        }
                        onClick={openRemoveFriendHandler}
                      >
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/c9BbXR9AzI1.png" />
                        Friends
                      </Button>
                      {showRemoveFriend && (
                        <div className={styles.respondBtnContainer__div}>
                          <button onClick={removeFriend}>Remove friend</button>
                        </div>
                      )}
                      {showRemoveFriend && (
                        <Backdrop onClick={closeRemoveFriendHandler} />
                      )}
                    </div>
                  )}

                  <Button
                    style={
                      isItMyFriend
                        ? { background: "rgb(13,110,253)", color: "white" }
                        : {}
                    }
                    className={styles.messageBtn}
                  >
                    <MessengerSVG color={isItMyFriend ? "white" : "black"} />{" "}
                    Message
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
                element={
                  <About
                    mySelf={mySelf}
                    setUserHandler={setUserHandler}
                    user={user}
                  />
                }
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
