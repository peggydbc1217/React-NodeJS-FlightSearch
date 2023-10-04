import React from "react";
import { Container } from "react-bootstrap";
import styles from "./CTAContainer.module.scss";

function CTAContainer({ children }) {
  return (
    <section
      className={`container-fluid pe-0 ${styles["bg-cover"]} px-lg-0 ${styles["cta-mt"]} position-relative`}
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)),url(/images/homepage/bg.png)`,
      }}
    >
      <Container>{children}</Container>
    </section>
  );
}

export default CTAContainer;
