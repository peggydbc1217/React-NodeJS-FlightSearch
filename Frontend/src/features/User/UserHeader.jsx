import styles from "./UserHeader.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

function UserHeader({ title }) {
  return (
    <>
      <div className="pb-4">
        <Link to="/">
          <LazyLoadImage
            alt="logo-footer"
            className={`${styles["footer__img"]} pb-4 w-50`}
            src="/images/homepage/LOGO.png"
            effect="blur"
            placeholderSrc={`/images/homepage/LOGO-low.jpg`}
          />
        </Link>
      </div>
      <h2 className="fw-bold py-4">{title}</h2>
    </>
  );
}

export default UserHeader;
