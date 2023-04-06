import { Form, Button } from "react-bootstrap";
import styles from "./loginForm.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { logIn } from "../../../store/actions/auth-actions";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Spinner } from "../../../utills/spinner";

interface LoginFormProps {
  onhandleOpenModal: () => void;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const notifications = useAppSelector((state) => state.notifications);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const openModalHander = () => {
    props.onhandleOpenModal();
  };

  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("The email is required")
        .email("This is an invalid email"),
      password: Yup.string().required("Please enter your password"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      dispatch(logIn(values)).then((res) => {
        if (res) {
          navigate("/home");
        } else setIsLoading(false);
      });
    },
  });

  useEffect(() => {
    if (notifications.status === "success") {
      navigate("/home");
    }
  }, [notifications]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.LoginForm}>
        <Form onSubmit={formik.handleSubmit} noValidate>
          <Form.Group className="mb-3" id="email">
            <Form.Control
              isInvalid={!!formik.errors.email && !!formik.touched.email}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              placeholder="E-mail adress"
              id="email"
              size="lg"
            />

            <Form.Control.Feedback type="invalid">
              Please enter valid e-mail adress.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" id="password">
            <Form.Control
              isInvalid={!!formik.errors.password && !!formik.touched.password}
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              placeholder="Password"
              id="password"
              size="lg"
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          {isLoading ? (
            <Spinner />
          ) : (
            <Button size="lg" variant="primary" type="submit">
              Log in
            </Button>
          )}
          <div className={styles.LoginForm__forgottenBtn}>
            <button type="button">Forgotten password?</button>
          </div>
          <div className={styles.LoginForm__newAccBtn}>
            <Button onClick={openModalHander}>Create new Account</Button>
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
