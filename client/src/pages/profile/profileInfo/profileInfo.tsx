import styles from "./profileInfo.module.css";
import classes from "../profile.module.css";
import { Button } from "react-bootstrap";
import { User } from "../../../types/types";
import { profileInfos } from "../../../utills/data";

const ProfileInfo: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className={styles.bottomContainer__left}>
      <div className={`${styles.bottomContainer__Intro} ${classes.card}`}>
        <div className={styles.bottomContainer__description}>
          <p>{user.intro || ""}</p>
          <Button variant="secondary">Edit Bio</Button>
        </div>
        {profileInfos(user).map((data) => {
          if (data.span !== "none")
            return (
              <div className={styles.infoDiv}>
                <img src={data.img} alt={data.paragraph} />
                <p>
                  {data.paragraph} <span>{data.span}</span>
                </p>
              </div>
            );
        })}
      </div>
      <div className={`${styles.bottomContainer__Photos} ${classes.card}`}>
        gregergerg
      </div>
      <div className={`${styles.bottomContainer__Friends} ${classes.card}`}>
        ergerge
      </div>
    </div>
  );
};

export default ProfileInfo;
