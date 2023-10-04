import styles from "../../../Custom.module.scss";

function CardFrontContent() {
  return (
    <ul className="list-unstyled pt-3 pt-md-5 mt-3 border-top border-secondary">
      <li className="d-flex align-items-end">
        <img
          className="me-2"
          src="/images/homepage/StarRate.png"
          style={{ height: "40px" }}
          alt="star"
        />
        <h2 className={`${styles["me-12"]} text-secondary fw-bold mb-0`}>
          4.8
        </h2>
        <p className="m-0 fs-6">Star Rating</p>
      </li>
      <li className={`${styles["mt-32"]} d-flex align-items-end`}>
        <img
          className="me-2"
          src="/images/homepage/Vector.png"
          style={{ height: "40px" }}
          alt="star"
        />
        <h2 className={`${styles["me-12"]}text-secondary fw-bold mb-0`}>
          2000+
        </h2>
        <p className="m-0 fs-6">Users</p>
      </li>
    </ul>
  );
}

export default CardFrontContent;
