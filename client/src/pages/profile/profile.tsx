import styles from "./profile.module.css";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router";
import { User } from "../../types/types";
import { Spinner } from "../../utills/spinner";
import { MoreSVG } from "../../utills/svg";
import { Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Posts from "./postsRoute/posts";
import About from "./aboutRoute/about";

const Profile: React.FC<{ handleFocus: (val: boolean) => void }> = ({
  handleFocus,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setUserHandler = (data: User) => {
    setUser(data);
  };

  const params = useParams<{ _id: string }>();
  useEffect(() => {
    axios
      .get("/api/users/profile?_id=" + params._id)
      .then((res: AxiosResponse<User>) => {
        setUserHandler(res.data);
        setIsLoading(false);
        handleFocus(false);
      })
      .catch((err) => {
        setIsLoading(false);
        handleFocus(false);
        console.log(err);
      });
  }, [params._id]);

  if (user && !isLoading) {
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
              <div>
                <Button>Add to story</Button>
                <Button>
                  <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tmaz0VO75BB.png" />
                  Edit profile
                </Button>
              </div>
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
  } else if (!user && !isLoading)
    return <div>This content isn't available at the moment</div>;
  else return <Spinner />;
};

export default Profile;
