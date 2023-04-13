import styles from "./profileInfo.module.css";
import classes from "../profile.module.css";
import { Button } from "react-bootstrap";
import { User } from "../../../types/types";
import { profileInfos } from "../../../utills/data";
import { useState } from "react";
import EditBio from "./editBio";

const ProfileInfo: React.FC<{
  user: User;
  setUserHandler: (data: User) => void;
}> = ({ user, setUserHandler }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={styles.bottomContainer__left}>
      <div className={`${styles.bottomContainer__Intro} ${classes.card}`}>
        <h2>Intro</h2>
        <div className={styles.bottomContainer__description}>
          <p>{user.intro || ""}</p>
          {isEditing ? (
            <EditBio setUserHandler={setUserHandler} />
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="secondary">
              {user.intro ? "Edit Bio" : "Add Bio"}
            </Button>
          )}
        </div>
        {profileInfos(user).map((data) => {
          if (data.span !== "none")
            return (
              <div key={data.paragraph} className={styles.infoDiv}>
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
