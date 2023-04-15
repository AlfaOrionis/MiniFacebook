import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./profileInfo.module.css";
import axios from "axios";
import { User } from "../../../types/types";
import { getTokenCookie } from "../../../utills/tools";
import { useAppDispatch } from "../../../store";
import { notificationActions } from "../../../store/slices/notification-slice";

const EditBio: React.FC<{
  setUserHandler: (data: User) => void;
  showEditHandler: (val: boolean) => void;
  userIntro: string;
}> = ({ setUserHandler, showEditHandler, userIntro }) => {
  const [inputValue, setInputValue] = useState(userIntro);

  const dispatch = useAppDispatch();

  const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  };

  const submitBioHandler = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("xd");
    e.preventDefault();
    axios
      .patch(
        "/api/users/profile",
        { description: inputValue },
        {
          headers: { Authorization: `Bearer ${getTokenCookie()}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        setUserHandler(res.data);
        showEditHandler(false);
      })
      .catch((err) => {
        dispatch(
          notificationActions.showNotification({
            status: "error",
            message: "Something went wrong",
          })
        );
      });
  };
  return (
    <div className={styles.editBio}>
      <Form onSubmit={submitBioHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            onChange={inputHandler}
            value={inputValue}
            as="textarea"
            rows={3}
          />
          <div className={styles.editBio__belowContainer}>
            <span>{100 - inputValue.length} characters remaining</span>
            <div>
              <Button
                onClick={() => showEditHandler(false)}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                disabled={inputValue.length > 100}
                type="submit"
                variant="secondary"
              >
                Save
              </Button>
            </div>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default EditBio;
