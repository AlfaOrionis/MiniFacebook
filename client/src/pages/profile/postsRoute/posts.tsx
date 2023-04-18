import styles from "./posts.module.css";
import classes from "../profile.module.css";
import { Button } from "react-bootstrap";
import { User } from "../../../types/types";
import { profileInfos } from "../../../utills/data";
import { useState } from "react";
import EditBio from "./editBio";
import { useAppSelector } from "../../../store";

const Posts: React.FC<{
  user: User;
  setUserHandler: (data: User) => void;
}> = ({ user, setUserHandler }) => {
  const mySelf = useAppSelector((state) => state.auth);
  console.log(mySelf.data._id);
  const [isEditing, setIsEditing] = useState(false);

  const showEditHandler = (bol: boolean) => {
    setIsEditing(bol);
  };
  console.log(user);
  return (
    <>
      <div className={styles.bottomContainer__left}>
        <div className={`${styles.bottomContainer__Intro} card`}>
          <h2>Intro</h2>
          <div className={styles.bottomContainer__description}>
            <p>{user.description}</p>
            {isEditing ? (
              <EditBio
                userIntro={user.description || ""}
                showEditHandler={showEditHandler}
                setUserHandler={setUserHandler}
              />
            ) : (
              mySelf.data._id === user._id && (
                <Button
                  onClick={() => showEditHandler(true)}
                  variant="secondary"
                >
                  {user.description ? "Edit Bio" : "Add Bio"}
                </Button>
              )
            )}
          </div>
          {profileInfos(user).map((data) => {
            if (data.span)
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
        <div className={`${styles.bottomContainer__Photos} card`}>
          gregergerg
        </div>
        <div className={`${styles.bottomContainer__Friends} card`}>ergerge</div>
      </div>
      <div className={styles.bottomContainer__right}>
        <div className="card">RIGHTRIGHTRIGHTRIGHTRIGHTRIGHTRIGHTRIGHT</div>
      </div>
    </>
  );
};

export default Posts;
