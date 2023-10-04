import { Form } from "react-bootstrap";
import styles from "./FormTextArea.module.scss";

function FormTextArea({ title, placeholder, required, id }) {
  return (
    <div className="mt-3 mb-3">
      <Form.Label
        htmlFor={id}
        className={`form-label ${styles["cursor-pointer"]} h2`}
      >
        {title}
      </Form.Label>
      <Form.Control
        type="text"
        className={`${styles["formInfo"]}  `}
        id={id}
        placeholder={placeholder}
        required={required}
      />
      <Form.Label
        htmlFor={id}
        className={`${styles["formInfo-label"]} d-block mt-1 ms-3 `}
      >
        {placeholder}
      </Form.Label>
      <h5>This only shows flight delays exceeding 60 minutes.</h5>
    </div>
  );
}

export default FormTextArea;
