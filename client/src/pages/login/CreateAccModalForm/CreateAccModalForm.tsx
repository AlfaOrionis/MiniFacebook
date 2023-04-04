import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "./CreateAcc.module.css";

import {
  getCurrentDate,
  getDaysList,
  getYearsList,
} from "../../../utills/tools";
import { getMonthList } from "../../../utills/tools";

interface CreateAccModalFormProps {
  onClose: () => void;
  show: boolean;
}

const CreateAccModalForm: React.FC<CreateAccModalFormProps> = (props) => {
  const currDay = getCurrentDate().day;
  const currMonth = getCurrentDate().month;
  const currYear = getCurrentDate().year;
  const [selectedDay, setSelectedDay] = useState<string>(currDay);
  const [selectedMonth, setSelectedMonth] = useState<string>(currMonth);
  const [selectedYear, setSelectedYear] = useState<string>(currYear);
  const handleSelectDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(event.target.value);
  };

  const handleSelectMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };
  const handleSelectYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onClose}
      backdrop="static"
      keyboard={true}
    >
      <Modal.Header closeButton>
        <Modal.Title className={styles.headerTitle}>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className={styles.namesContainer}>
            <Form.Group className="mb-3" id="firstname">
              <Form.Control
                className={styles.grey}
                type="firstname"
                placeholder="First name"
                id="firstname"
              />

              <Form.Control.Feedback type="invalid">
                Please enter valid e-mail adress.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" id="lastname">
              <Form.Control
                className={styles.grey}
                type="lastname"
                placeholder="Last name"
                id="lastname"
              />

              <Form.Control.Feedback type="invalid">
                Please enter valid e-mail adress.
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <Form.Group className="mb-3" id="email">
            <Form.Control
              className={styles.grey}
              type="email"
              placeholder="E-mail adress"
              id="email"
            />

            <Form.Control.Feedback type="invalid">
              Please enter valid e-mail adress.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" id="password">
            <Form.Control
              className={styles.grey}
              type="password"
              placeholder="Password"
              id="password"
            />

            <Form.Control.Feedback type="invalid">
              Please enter valid e-mail adress.
            </Form.Control.Feedback>
          </Form.Group>
          <div className={styles.dateContainer}>
            <Form.Select
              value={selectedDay}
              onChange={handleSelectDay}
              aria-label="Choose day"
            >
              {getDaysList().map((number) => (
                <option key={number}>{number}</option>
              ))}
            </Form.Select>

            <Form.Select
              value={selectedMonth}
              onChange={handleSelectMonth}
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
              value={selectedYear}
              onChange={handleSelectYear}
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
          <div className={styles.genderContainer}>
            <div>
              <Form.Label htmlFor="male">Male</Form.Label>
              <Form.Check type="checkbox" id="male" />
            </div>
            <div>
              <Form.Label htmlFor="female">Female</Form.Label>
              <Form.Check type="checkbox" id="female" />
            </div>
            <div style={{ border: "none" }} />
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
          <button type="submit" className={styles.signUpBtn}>
            Sign Up
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateAccModalForm;
