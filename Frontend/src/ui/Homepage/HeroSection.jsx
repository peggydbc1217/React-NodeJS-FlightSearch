import { Container } from "react-bootstrap";
import styles from "./HeroSection.module.scss"; // Import your SCSS module styles
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useLazyBackgroundImg from "../../CustomHook/useLazyBackgroundImg";

const HeroSection = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const loaded = useLazyBackgroundImg("/images/homepage/hero_image.jpg");

  return (
    <section
      className={`${styles["bg-cover"]} container-fluid pe-0 px-lg-0 ${styles["img-height-setting"]} ${styles["clip-path-hero"]} `}
      style={{
        backgroundImage: `url(${
          loaded || "/images/homepage/hero_image-low.jpg"
        })`,
        filter: `${loaded ? "none" : "blur(10px)"}`,
      }}
      data-aos="fade-up"
      data-aos-offset="0"
      data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
    >
      <Container className={`text-center ${styles["pt-6"]} `}>
        <p
          className={`text-light fw-bold ${styles["ls-10"]} ${styles["rfs-80"]} text-break`}
        >
          Life is an endless journey of exploration
        </p>
        <h3 className="text-light mt-4 fs-sm-3 fs-4">
          Your journey is closer than you think
        </h3>
        <h3 className="text-light mt-1 fs-sm-3 fs-4">
          Don't wait for the next long weekend
        </h3>
      </Container>

      <Container className={`text-center ${styles["hero-text-mt"]}`}>
        <h5 className="text-light mb-3">
          Find the wings for your travel. Start your journey now.
        </h5>
        {/* Remember to provide the correct link */}
        <Link
          to="/flightSearch/searchForm"
          className={`${styles["btn-hover"]} btn btn-warning rounded-0 fw-bold`}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Start Journey
        </Link>
      </Container>
    </section>
  );
};

export default HeroSection;
