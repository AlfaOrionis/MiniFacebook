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
  const photos: string[] = [];
  const getUserPhotos = () => {
    if (user.profilePicture && user.profilePicture.url)
      photos.push(user.profilePicture.url);
    if (user.backgroundPicture && user.backgroundPicture.url)
      photos.push(user.backgroundPicture.url);
  };
  getUserPhotos();
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
            {photosContainer && photos.length > 0 && (
              <ul>
                {photos.map((url) => (
                  <li key={url} className={styles.photosContainer__photo}>
                    <div
                      style={{
                        height: `${photosContainer!.clientWidth * 0.33 - 4}px`,
                        backgroundImage: `url(${url})`,
                      }}
                    />
                  </li>
                ))}
              </ul>
            )}
            {!user.photos || (photos.length < 1 && <p>No photos added.</p>)}
          </div>
        </div>
        <div className={`${styles.bottomContainer__Friends} card`}>
          <div className={styles.bottomContainer__titleContainer}>
            <div>
              <h2>Friends</h2>
              <span>{user.friends.length} friends</span>
            </div>
            <Link to={"/profile/" + user._id + "/friends"}>
              See all friends
            </Link>
          </div>
          <ul className={styles.friendsContainer}>
            {photosContainer &&
              user.friends.length > 0 &&
              user.friends.map((fr) => (
                <div className={styles.friendsContainer__friend}>
                  <Link to={"/profile/" + fr._id._id + "/"}>
                    <div
                      style={{
                        height: `${photosContainer!.clientWidth * 0.33 - 7}px`,
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          backgroundImage: `url(${
                            fr._id.profilePicture.url ||
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                          })`,
                        }}
                      />
                      <p>{`${fr._id.firstname} ${fr._id.lastname}`}</p>
                    </div>
                  </Link>
                </div>
              ))}
          </ul>
        </div>
      </div>
      <div className={styles.bottomContainer__right}>
        <div className="card">Posts</div>
      </div>
    </>
  );
};

export default Posts;
