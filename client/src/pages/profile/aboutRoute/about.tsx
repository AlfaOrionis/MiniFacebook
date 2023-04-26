import { useState } from "react";
import { User } from "../../../types/types";
import { info, profileInfos, type } from "../../../utills/data";
import styles from "./about.module.css";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";
import { getTokenCookie } from "../../../utills/tools";
import { useAppDispatch } from "../../../store";
import { notificationActions } from "../../../store/slices/notification-slice";
import { AddSVG } from "../../../utills/svg";
import { initialState } from "../../../store/slices/auth-slice";

const About: React.FC<{
  mySelf: initialState;
  user: User;
  setUserHandler: (data: User) => void;
}> = ({ mySelf, user, setUserHandler }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState<type>("");

  const [inputValue, setInputValue] = useState<any>("");

  console.log(inputValue);

  const setIsEditingHandler = (data: type) => {
    setIsEditing(data);
  };

  const submitHandler = () => {
    axios
      .patch(
        `/api/users/update/${isEditing}`,
        { [isEditing]: inputValue },
        {
          headers: { Authorization: `Bearer ${getTokenCookie()}` },
        }
      )
      .then((res) => {
        setIsEditingHandler("");
        setUserHandler(res.data);
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          notificationActions.showNotification({
            status: "error",
            message: "Something went wrong",
          })
        );
      });
  };
  const inputHandler = <T extends HTMLSelectElement | HTMLInputElement>(
    e: React.ChangeEvent<T>
  ) => {
    e.preventDefault();

    setInputValue(e.target.value);
  };
  console.log(inputValue);

  return (
    <div className={`${styles.aboutContainer} card`}>
      <div>
        <h2>About</h2>
      </div>

      <div>
        {profileInfos(user).map((data: info) => {
          if (
            (data.span || isEditing === data.type) &&
            data.paragraph !== "Joined On"
          ) {
            return (
              <div key={data.paragraph} className={styles.infoDiv}>
                {isEditing !== data.type ? (
                  <div>
                    <img src={data.img} alt={data.paragraph} />
                    <p>
                      {data.paragraph} <span>{data.span}</span>
                    </p>
                  </div>
                ) : (
                  <div className={styles.infoDiv__inputContainer}>
                    {isEditing !== "relationship" ? (
                      <>
                        <FloatingLabel
                          controlId="floatingInput"
                          label={
                            data.type === "livesIn" ? "lives in" : data.type
                          }
                          className="mb-3"
                        >
                          <Form.Control
                            onChange={inputHandler<HTMLInputElement>}
                            value={inputValue}
                            type={data.type}
                            placeholder={data.type}
                          />
                        </FloatingLabel>
                        <div className={styles.lengthInfo}>
                          <span>
                            {100 - inputValue.length} characters remaining
                          </span>
                        </div>
                        <div className={styles.borderBottom} />
                      </>
                    ) : (
                      <>
                        <Form.Select
                          onChange={inputHandler}
                          value={inputValue}
                          style={{ cursor: "pointer" }}
                          className={styles.select}
                          aria-label="Default select example"
                        >
                          <option value="">Status</option>
                          <option value="Single">Single</option>
                          <option value="In a relationship">
                            In a relationship
                          </option>
                          <option value="Engaged">Engaged</option>
                          <option value="Married">Married</option>
                          <option value="Divorced">Divorced</option>
                          <option value="Widowed">Widowed</option>
                        </Form.Select>
                        <div className={styles.borderBottom} />
                      </>
                    )}
                    <div className={styles.infoDiv__btnContainer}>
                      <Button
                        onClick={() => {
                          setIsEditingHandler("");
                          setInputValue("");
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        disabled={inputValue.length > 100}
                        onClick={submitHandler}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                )}
                {isEditing !== data.type && (
                  <button
                    onClick={() => {
                      setIsEditingHandler(data.type);
                      setInputValue(data.type !== "" && user[data.type]);
                    }}
                  >
                    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tmaz0VO75BB.png" />
                  </button>
                )}
              </div>
            );
          } else {
            return (
              data.add &&
              user._id === mySelf.data._id && (
                <button
                  onClick={() => {
                    setIsEditingHandler(data.type);
                    console.log(isEditing);
                  }}
                  className={styles.addInfoContainer}
                >
                  <AddSVG />
                  <p>Add {data.add} </p>
                </button>
              )
            );
          }
        })}
      </div>
    </div>
  );
};

export default About;
