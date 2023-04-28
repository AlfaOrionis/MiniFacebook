import axios from "axios";
import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { getTokenCookie } from "../utills/tools";

const AddPictureModal: React.FC<{
  showPictureModal: boolean;
  closePictureModal: () => void;
}> = ({ closePictureModal, showPictureModal }) => {
  const [inputValue, setInputValue] = useState<any>("");

  const submitHandler = () => {
    if (!inputValue) return false;
    let formData = new FormData();
    formData.append("file", inputValue);
    console.log(formData);

    axios
      .post("/api/users/uploadPicture", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${getTokenCookie()}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      show={showPictureModal}
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
