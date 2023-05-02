import axios, { Axios, AxiosResponse } from "axios";
import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { getTokenCookie } from "../utills/tools";
import { User } from "../types/types";
import { useAppDispatch } from "../store";
import { authActions } from "../store/slices/auth-slice";

const AddPictureModal: React.FC<{
  showPictureModal: "" | "profile" | "background";
  setUserHandler: (data: User) => void;
  closePictureModal: () => void;
}> = ({ closePictureModal, showPictureModal, setUserHandler }) => {
  const [inputValue, setInputValue] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const submitHandler = () => {
    if (!inputValue) return false;
    // Get file extension
    const fileExtension = inputValue.name.split(".").pop().toLowerCase();
    const allowedExtensions = ["jpg", "jpeg", "png"];
    if (!allowedExtensions.includes(fileExtension)) {
      alert("Please select a valid image file.");
      return false;
    }

    console.log(fileExtension);
    let formData = new FormData();
    formData.append("file", inputValue);
    formData.append("type", showPictureModal);
    console.log(formData);

    axios
      .post("/api/users/addProfilePicture", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${getTokenCookie()}`,
        },
      })
      .then((res: AxiosResponse<User>) => {
        console.log(res);
        dispatch(authActions.userProfilePicture(res.data.profilePicture));
        setUserHandler(res.data);
        closePictureModal();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      show={!!showPictureModal}
      onHide={() => {
        closePictureModal();
        setInputValue("");
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Add picture</Form.Label>
          <Form.Control
            onChange={(e: any) => {
              setInputValue(e.target.files[0]);
            }}
            type="file"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            closePictureModal();
            setInputValue("");
          }}
        >
          Close
        </Button>
        <Button variant="primary" onClick={submitHandler}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPictureModal;
