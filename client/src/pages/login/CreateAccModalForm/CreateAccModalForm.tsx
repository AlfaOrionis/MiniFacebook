import { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import styles from "./CreateAcc.module.css";
import * as Yup from "yup";
import {
  getCurrentDate,
  getDaysList,
  getYearsList,
} from "../../../utills/tools";
import { validation } from "./CreateAccValidation";
import { getMonthList } from "../../../utills/tools";
import { useFormik } from "formik";

import { useAppDispatch, useAppSelector } from "../../../store";
import { userRegister } from "../../../store/actions/auth-actions";
import { Spinner } from "../../../utills/spinner";
import { useNavigate } from "react-router-dom";

interface CreateAccModalFormProps {
  onClose: () => void;
  show: boolean;
}

const CreateAccModalForm: React.FC<CreateAccModalFormProps> = (props) => {
  const currDay = getCurrentDate().day;
  const currMonth = getCurrentDate().month;
  const currYear = getCurrentDate().year;

  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.notifications);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (notifications.status === "success") {
      navigate("/home");
    }

    if (notifications.status === "error") {
      setIsLoading(false);
    }
  }, [notifications]);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      birthday: "",
      day: currDay,
      month: currMonth,
      year: currYear,
      gender: "",
    },
    validationSchema: validation,
    onSubmit: (values) => {
      const birthdayString = `${values.year}-${values.month}-${values.day}`;

      values.birthday = birthdayString;
      console.log(birthdayString);
      console.log(values);
      setIsLoading(true);
      dispatch(userRegister(values));
    },
  });

  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.onClose();
        formik.resetForm();
      }}
      backdrop="static"
      keyboard={true}
    >
      <Modal.Header closeButton>
        <Modal.Title className={styles.headerTitle}>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} noValidate>
          <div className={styles.namesContainer}>
            <Form.Group className="mb-3" id="firstname">
              <Form.Control
                onChange={formik.handleChange}
                isInvalid={
                  !!formik.errors.firstname && !!formik.touched.firstname
                }
                value={formik.values.firstname}
                className={styles.grey}
                type="firstname"
                placeholder="First name"
                id="firstname"
              />

              <Form.Control.Feedback type="invalid">
                {formik.errors.firstname}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" id="lastname">
              <Form.Control
                onChange={formik.handleChange}
                isInvalid={
                  !!formik.errors.lastname && !!formik.touched.lastname
                }
                value={formik.values.lastname}
                className={styles.grey}
                type="lastname"
                placeholder="Last name"
                id="lastname"
              />

              <Form.Control.Feedback type="invalid">
                {formik.errors.lastname}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <Form.Group className="mb-3" id="email">
            <Form.Control
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.email && !!formik.touched.email}
              value={formik.values.email}
              className={styles.grey}
              type="email"
              placeholder="E-mail adress"
              id="email"
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" id="password">
            <Form.Control
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.password && !!formik.touched.password}
              value={formik.values.password}
              className={styles.grey}
              type="password"
              placeholder="Password"
              id="password"
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <div className={styles.dateContainerWrapper}>
            <label className={styles.label}>Birthday</label>
            <div className={styles.dateContainer}>
              <Form.Select
                id="day"
                value={formik.values.day}
                onChange={formik.handleChange}
                aria-label="Choose day"
              >
                {getDaysList().map((number) => (
                  <option key={number}>{number}</option>
                ))}
              </Form.Select>

              <Form.Select
                id="month"
                value={formik.values.month}
                onChange={formik.handleChange}
                aria-label="Choose month"
              >
                {getMonthList().map((month) => {
                  return (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  );
                })}
              </Form.Select>
              <Form.Select
                id="year"
                value={formik.values.year}
                onChange={formik.handleChange}
                aria-label="Choose year"
              >
                {getYearsList().map((year) => {
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
          </div>
          <div>
            <label className={styles.label}>Gender</label>
            <div className={styles.genderContainer}>
              <div
                className={
                  formik.errors.gender && formik.touched.gender
                    ? styles.invalidBorder
                    : ""
                }
              >
                <Form.Label htmlFor="male">Male</Form.Label>
                <Form.Check
                  isInvalid={!!formik.errors.gender && !!formik.touched.gender}
                  checked={formik.values.gender === "male"}
                  onChange={(e) => {
                    formik.setFieldValue("gender", "male").then(() => {
                      console.log(formik.values);
                    });
                  }}
                  type="checkbox"
                  name="gender"
                  id="male"
                  value="male"
                />
              </div>
              <div
                className={
                  formik.errors.gender && formik.touched.gender
                    ? styles.invalidBorder
                    : ""
                }
              >
                <Form.Label htmlFor="female">Female</Form.Label>
                <Form.Check
                  isInvalid={!!formik.errors.gender && !!formik.touched.gender}
                  checked={formik.values.gender === "female"}
                  onChange={(e) => {
                    formik.setFieldValue("gender", "female").then(() => {
                      console.log(formik.values);
                    });
                  }}
                  type="checkbox"
                  name="gender"
                  id="female"
                  value="female"
                />
              </div>
              <div style={{ border: "none" }} />
            </div>
            {formik.errors.gender && formik.touched.gender && (
              <p className={styles.genderInvalid}>
                You must choose your gender
              </p>
            )}
          </div>

          <div className={styles.formDescription}>
            <p>
              People who use our service may have uploaded your contact
              information to Facebook. Learn more.
            </p>
            <p>
              By clicking Sign Up, you agree to our Terms. Learn how we collect,
              use and share your data in our Privacy Policy and how we use
              cookies and similar technology in our Cookies Policy. You may
              receive SMS Notifications from us and can opt out any time.
            </p>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <button type="submit" className={styles.signUpBtn}>
              Sign Up
            </button>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateAccModalForm;
