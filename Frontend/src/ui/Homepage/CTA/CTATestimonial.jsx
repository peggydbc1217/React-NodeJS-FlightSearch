import { Col } from "react-bootstrap";
import StarRatingCard from "./StartRatingCard/StarRatingCard";
import CustomerCommentCard from "./CustomerCommentCard";

function CTATestimonial() {
  return (
    <Col
      xs={12}
      xl={6}
      className="ps-4"
      data-aos="fade-right"
      data-aos-offset="-200"
      data-aos-delay="0"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
    >
      <div className="d-flex position-relative justify-content-end row row-cols-1">
        {/* Your content here */}
        <StarRatingCard></StarRatingCard>
        <CustomerCommentCard></CustomerCommentCard>
      </div>
    </Col>
  );
}

export default CTATestimonial;
