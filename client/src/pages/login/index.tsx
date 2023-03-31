import styles from "./login.module.css";
import LoginForm from "./LoginForm/LoginForm";

const Login = () => {
  return (
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
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
