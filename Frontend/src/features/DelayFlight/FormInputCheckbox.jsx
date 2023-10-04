import { Form } from "react-bootstrap";
import styles from "./FormInputCheckbox.module.scss";

function FormInputCheckbox({ title, name, id, description, amount, register }) {
  return (
    <>
      <h2 className="">{title}</h2>
      <div className="d-flex flex-column flex-md-row">
        {Array.from({ length: amount }, (_, i) => {
          return (
            <div key={id[i]}>
              <Form.Check className={`form-check ${i !== 0 && "ms-0 ms-md-3"}`}>
                <Form.Check.Input
                  className="form-check-input mt-2"
                  type="radio"
                  name={name}
                  value={description[i]}
                  id={id[i]}
                  style={{ height: "40px", width: "40px" }}
                  defaultChecked={i === 0}
                  {...register("type")}
                />

                <Form.Check.Label
                  className={`form-check-label d-block py-3 mb-0 ms-4 ${styles["fs-rwd-16-sm-24"]} ${styles["cursor-pointer"]} text-secondary `}
                  htmlFor={id[i]}
                >
                  {description[i]}
                </Form.Check.Label>
              </Form.Check>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default FormInputCheckbox;
