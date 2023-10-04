import React from "react";
import styles from "./Footer.module.scss"; // Import your SCSS module styles
import { Container } from "react-bootstrap";
import FooterIconList from "./FooterIconList";
// import FooterFunctionsList from "./FooterFunctionsList";
// import FooterAccountList from "./FooterAccountList";
import { Nav } from "react-bootstrap"; // Import Bootstrap
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";

const FooterFunctionsList = lazy(() => import("./FooterFunctionsList"));
const FooterAccountList = lazy(() => import("./FooterAccountList"));
const ENewsLetter = lazy(() => import("./ENewsLetter"));

function Footer() {
  const loading = useSelector((state) => state.loading?.isLoading);
  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <footer className={`${styles.footer}`}>
      {/* <!-- E-NEWSLETTER --> */}
      <Suspense fallback={<span>Loading.....</span>}>
        <ENewsLetter />
      </Suspense>

      {/* <!-- FOOTER LOGO --> */}
      <div
        className={`bg-secondary  text-center ${styles["footer-logo-padding"]}`}
      >
        <Container>
          <Link
            to="/"
            className={`${styles["footer__logo"]}`}
            onClick={scrollToTop}
          >
            <img
              className={`pb-4 ${styles["footer__img"]}`}
              src="/images/homepage/logo_footer.svg"
              alt="logo-footer"
              onClick={loading ? handleClick : null}
            />
          </Link>
          <p className={`h5 pt-4 text-light`}>Let Dreams Take Flight ✈️</p>
        </Container>
      </div>

      {/* <!--FOOTER ICONS AND CTA  --> */}
      <Nav
        className={`navbar navbar-expand-lg  bg-dark ${styles["footer-iconList-padding"]}`}
      >
        <Container className="container justify-content-lg-between">
          <Suspense fallback={<span>Loading.....</span>}>
            <FooterIconList></FooterIconList>
            <FooterFunctionsList></FooterFunctionsList>
            {/* <!-- 登入註冊 --> */}
            <FooterAccountList></FooterAccountList>
          </Suspense>
        </Container>
      </Nav>
    </footer>
  );
}

export default Footer;
