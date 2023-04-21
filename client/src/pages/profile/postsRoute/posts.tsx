import styles from "./posts.module.css";
import classes from "../profile.module.css";
import { Button } from "react-bootstrap";
import { User } from "../../../types/types";
import { profileInfos } from "../../../utills/data";
import { useState } from "react";
import EditBio from "./editBio";
import { useAppSelector } from "../../../store";
import { Link } from "react-router-dom";

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

  const photosContainer = document.getElementById("photosContainer");

  return (
    <>
      <div className={styles.bottomContainer__left}>
        <div className={`${styles.bottomContainer__Intro} card`}>
          <h2>Intro</h2>
          <div className={styles.bottomContainer__description}>
            {!isEditing && <p>{user.description}</p>}
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
          <div className={styles.photosTitle}>
            <h2>Photos</h2>
            <Link to={`/profile/${user._id}/photos`}>See all photos</Link>
          </div>

          <div id="photosContainer" className={styles.photosContainer}>
            {photosContainer && user.photos && user.photos.length > 0 && (
              <>
                <div className={styles.photosContainer__photo}>
                  <div
                    style={{
                      height: `${photosContainer!.clientWidth * 0.33 - 4}px`,
                    }}
                  />
                </div>
                <div className={styles.photosContainer__photo}>
                  <div
                    style={{
                      height: `${photosContainer!.clientWidth * 0.33 - 4}px`,
                    }}
                  />
                </div>

                <div className={styles.photosContainer__photo}>
                  <div
                    style={{
                      height: `${photosContainer!.clientWidth * 0.33 - 4}px`,
                    }}
                  />
                </div>
                <div className={styles.photosContainer__photo}>
                  <div
                    style={{
                      height: `${photosContainer!.clientWidth * 0.33 - 4}px`,
                    }}
                  />
                </div>
                <div className={styles.photosContainer__photo}>
                  <div
                    style={{
                      height: `${photosContainer!.clientWidth * 0.33 - 4}px`,
                    }}
                  />
                </div>
                <div className={styles.photosContainer__photo}>
                  <div
                    style={{
                      height: `${photosContainer!.clientWidth * 0.33 - 4}px`,
                    }}
                  />
                </div>
                <div className={styles.photosContainer__photo}>
                  <div
                    style={{
                      height: `${photosContainer!.clientWidth * 0.33 - 4}px`,
                    }}
                  />
                </div>
              </>
            )}
            {!user.photos ||
              (user.photos.length < 1 && <p>No photos added.</p>)}
          </div>
        </div>
        <div className={`${styles.bottomContainer__Friends} card`}>Friends</div>
      </div>
      <div className={styles.bottomContainer__right}>
        <div className="card">Posts</div>
      </div>
    </>
  );
};

export default Posts;
