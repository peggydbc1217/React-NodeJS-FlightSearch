import { Row } from "react-bootstrap";
import CTAContainer from "./CTAContainer";
import CTAAbout from "./CTAAbout";
import CTATestimonial from "./CTATestimonial";

function CTA() {
  return (
    <CTAContainer>
      <Row className={`row-cols-1 row-cols-xl-12 mx-0`}>
        {/* CTA-LEFT */}
        <CTAAbout></CTAAbout>
        {/* CTA-RIGHT */}
        <CTATestimonial></CTATestimonial>
      </Row>
    </CTAContainer>
  );
}

export default CTA;
