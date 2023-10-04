import { Container } from "react-bootstrap";
import SectionHeader from "../SectionHeader";
import CTAAboutItem from "./CTAAboutItem";

function CTAAbout() {
  return (
    <Container
      className={`col col-xl-6 pe-0`}
      data-aos="fade-right"
      data-aos-offset="-200"
      data-aos-delay="0"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
    >
      <SectionHeader
        number="04"
        title="Why Choose FlightEase?"
        description="Providing You with the Best Services"
      ></SectionHeader>

      <ul className="list-unstyled">
        <CTAAboutItem
          imageName="convenient"
          title="Unmatched Convenience"
          description="Easily book flights anytime, anywhere, saving your valuable time and energy."
        ></CTAAboutItem>
        <CTAAboutItem
          imageName="safety"
          title="Safety and Reliability"
          description="We partner with verified airlines to ensure your travel is safe and comfortable."
        ></CTAAboutItem>
        <CTAAboutItem
          imageName="brooke"
          title="Excellent Customer Service"
          description="
          We prioritize customer communication and strive for exceptional experiences."
        ></CTAAboutItem>
      </ul>
    </Container>
  );
}

export default CTAAbout;
