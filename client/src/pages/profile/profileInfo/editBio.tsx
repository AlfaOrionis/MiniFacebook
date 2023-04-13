import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./profileInfo.module.css";
import axios from "axios";
import { User } from "../../../types/types";
import { getTokenCookie } from "../../../utills/tools";

const EditBio: React.FC<{ setUserHandler: (data: User) => void }> = ({
  setUserHandler,
}) => {
  const [inputValue, setInputValue] = useState("");

  const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  };

  const submitBioHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .patch(
        "/api/users/profile",
        { intro: inputValue },
        {
          headers: { Authorization: `Bearer ${getTokenCookie()}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        setUserHandler(res.data);
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
              <Button variant="secondary">Cancel</Button>
              <Button
                type="submit"
                disabled={
                  inputValue.trim().length === 0 ||
                  inputValue.trim().length > 100
                    ? true
                    : false
                }
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
