import styles from "./profile.module.css";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { User } from "../../types/types";
import { Spinner } from "../../utills/spinner";
import { MoreSVG } from "../../utills/svg";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfileInfo from "./profileInfo/profileInfo";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams<{ _id: string }>();
  useEffect(() => {
    axios
      .get("/api/users/profile?_id=" + params._id)
      .then((res: AxiosResponse<User>) => {
        setUser(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

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
                <Link to={`/profile/${params._id}`}>Posts</Link>
              </li>
              <li>
                <Link to={`/profile/${params._id}`}>About</Link>
              </li>
              <li>
                <Link to={`/profile/${params._id}`}>Friends</Link>
              </li>
              <li>
                <Link to={`/profile/${params._id}`}>Photos</Link>
              </li>
              <li>
                <Link to={`/profile/${params._id}`}>More</Link>
              </li>
            </ul>
            <div className={styles.MoreSVG}>
              <MoreSVG />
            </div>
          </div>
        </div>
        <div className={styles.bottomContainerWrapper}>
          <div className={styles.bottomContainer}>
            <ProfileInfo user={user} />
            <div className={styles.bottomContainer__right}>
              <div className={styles.card}>
                RIGHTRIGHTRIGHTRIGHTRIGHTRIGHTRIGHTRIGHT
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (!user && !isLoading)
    return <div>This content isn't available at the moment</div>;
  else return <Spinner />;
};

export default Profile;
