import { useState } from "react";
import CreateAccModalForm from "./CreateAccModalForm/CreateAccModalForm";
import styles from "./login.module.css";
import LoginForm from "./LoginForm/LoginForm";
import Footer from "../../components/footer/Footer";
import {
  FbSVG,
  GroupsSVG,
  HomeSVG,
  MarketPlaceSVG,
  MoreSVG,
  WatchSVG,
} from "../../utills/svg";

const Login = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className={styles.login}>
        <div className={styles.container}>
          <div className={styles.container__left}>
            <div className={styles.left__img}>
              <img
                src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
                alt="Facebook"
              />
            </div>
            <p className={`${styles.left__firstP} bootstrap-reset`}>
              Recent logins
            </p>
            <p className={styles.left__secondP}>
              Click your picture or add an account.
            </p>
          </div>
          <div className={styles.container__right}>
            <LoginForm onhandleOpenModal={handleOpenModal} />
          </div>
        </div>
        <CreateAccModalForm onClose={handleCloseModal} show={showModal} />
      </div>
      <Footer />
    </>
  );
};

export default Login;
