import { Form, Button } from "react-bootstrap";
import styles from "./loginForm.module.css";

const LoginForm = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.LoginForm}>
        <Form onSubmit={() => {}}>
          <Form.Group className="mb-3" id="currentPassword">
            <Form.Control size="lg"></Form.Control>

            <Form.Control.Feedback type="invalid">
              {/* {formik.errors.currentPassword} */}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" id="newPassword">
            <Form.Control size="lg"></Form.Control>
            <Form.Control.Feedback type="invalid">
              {/* {formik.errors.newPassword} */}
            </Form.Control.Feedback>
          </Form.Group>

          <Button size="lg" variant="primary" type="submit">
            Log in
          </Button>
          <div className={styles.LoginForm__forgottenBtn}>
            <button>Forgotten password?</button>
          </div>
          <div className={styles.LoginForm__newAccBtn}>
            <Button>Create new Account</Button>
          </div>
        </Form>
      </div>
      <p className={styles.wrapper__createPage}>
        Create a Page for a celebrity, brand or business.
      </p>
    </div>
  );
};

export default LoginForm;
