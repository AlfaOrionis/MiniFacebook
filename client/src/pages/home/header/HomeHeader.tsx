import {
  FbSVG,
  GroupsSVG,
  HomeSVG,
  MarketPlaceSVG,
  MessengerSVG,
  MoreSVG,
  NotificationSVG,
  WatchSVG,
} from "../../../utills/svg";
import styles from "./HomeHeader.module.css";

const windowWidth = window.innerWidth;
const widthCheck = windowWidth < 768;

const HomeHeader = () => {
  return (
    <div className={styles.HomeHeader}>
      <div className={styles.HomeHeader__left}>
        <FbSVG />
        <div className={styles.HomeHeader__searchInputContainer}>
          <input placeholder="Search on facebook" />
        </div>
      </div>
      <div className={styles.HomeHeader__middle}>
        <ul>
          <li className={`${widthCheck ? "hidden" : ""}`}>
            <HomeSVG />
          </li>
          <li className={`${widthCheck ? "hidden" : ""}`}>
            <WatchSVG />
          </li>
          <li className={`${widthCheck ? "hidden" : ""}`}>
            <MarketPlaceSVG />
          </li>
          <li className={`${widthCheck ? "hidden" : ""}`}>
            <GroupsSVG />
          </li>
          <li>
            <MoreSVG />
          </li>
        </ul>
      </div>
      <div className={styles.HomeHeader__right}>
        <div className={styles.SVGContainer}>
          <MessengerSVG />
        </div>
        <div className={styles.SVGContainer}>
          <NotificationSVG />
        </div>
        <div className={styles.profileContainer}>
          <img
            alt="Account"
            src="https://i.wpimg.pl/O/1280x720/d.wpimg.pl/1292000565-1150296623/wiedzmin-wiedzmin-netflix.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
