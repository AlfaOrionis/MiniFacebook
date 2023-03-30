import { Form, Button } from "react-bootstrap";
import styles from "./loginForm.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Sorry the email is required")
        .email("This is an invalid email"),
      password: Yup.string().required("Please enter your password"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

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

          <Button size="lg" variant="primary" type="submit">
            Log in
          </Button>
          <div className={styles.LoginForm__forgottenBtn}>
            <button type="button">Forgotten password?</button>
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
