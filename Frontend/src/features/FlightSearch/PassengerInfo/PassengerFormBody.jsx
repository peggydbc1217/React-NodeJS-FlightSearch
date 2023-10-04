import styles from "./PassengerInfo.module.scss";
import { Form, Row, Col, Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Controller } from "react-hook-form";

function PassengerFormBody({
  register,
  OnSetSelectedAmount,
  OnSetSelectedClass,
  control,
}) {
  const { email } = useSelector((state) => state.user.currentUser) || {};

  return (
    <div className="formBody py-5 text-secondary">
      <Row className="mb-4 mb-sm-0 mb-md-5">
        <Col
          xs={12}
          md={6}
          className="d-flex pe-md-4 mb-5 mb-sm-4 mb-md-3 mb-lg-0"
        >
          <Form.Group as={Col} controlId="surname1">
            <Form.Label className="fs-5 col-4 w-lg-20 d-flex my-auto">
              Fisrt Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="surname1"
              placeholder="Same as passport, remove spaces and special characters."
              className="col-8 w-lg-80 px-3 py-2 border-1 border-secondary rounded-0 lh-lg"
              {...register("surname", { required: true })}
            />
          </Form.Group>
        </Col>

        <Col
          xs={12}
          md={6}
          className="d-flex ps-md-1 ps-lg-4 mb-4 mb-md-3 mb-lg-0"
        >
          <Form.Group as={Col} controlId="given_name1">
            <Form.Label className="fs-5 col-4 w-lg-20 d-flex my-auto">
              Given Name<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="given_name1"
              placeholder="Same as passport, remove spaces and special characters."
              className="col-8 w-lg-80 px-3 py-2 border-1 border-secondary rounded-0 lh-lg"
              {...register("givenName", { required: true })}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-md-5 mb-lg-4">
        <Col xs={12} md={6} className="d-flex pe-md-4 mb-4 mb-md-0 mb-lg-0">
          {/* AMOUNT */}
          <Form.Group as={Col} controlId="appellation1">
            <Form.Label className="fs-5 col-3 w-lg-20 d-flex my-auto">
              Amount<span className="text-danger">*</span>
            </Form.Label>
            <Controller
              name="amount"
              control={control}
              defaultValue={1} // Set a default value
              render={({ field }) => (
                <Dropdown onSelect={(value) => field.onChange(value)}>
                  <Dropdown.Toggle
                    variant="secondary"
                    id="dropdownAmount"
                    defaultValue={1}
                  >
                    {" "}
                    {field.value || 1}
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    className={`${styles["custom-dropdown-menu"]}`}
                  >
                    {Array.from({ length: 10 }, (_, i) => {
                      return (
                        <Dropdown.Item
                          key={i + 1}
                          eventKey={i + 1}
                          onClick={() => OnSetSelectedAmount(i + 1)}
                        >
                          {i + 1}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              )}
            />
          </Form.Group>

          {/* FLIGHTCLASS */}
          <Form.Group as={Col} controlId="appellation1">
            <Form.Label className="fs-5 col-3 w-lg-20 d-flex my-auto">
              Class<span className="text-danger">*</span>
            </Form.Label>

            <Controller
              name="flightClass"
              control={control}
              defaultValue="Economy" // Set a default
              render={({ field }) => (
                <Dropdown
                  onSelect={(value) => {
                    field.onChange(value);
                    OnSetSelectedClass(value);
                  }}
                >
                  <Dropdown.Toggle
                    variant="secondary"
                    id="dropdownFlightClass"
                    defaultValue="Economy"
                  >
                    {field.value || "Economy"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className={`${styles["custom-dropdown-menu"]}`}
                  >
                    <Dropdown.Item key="Economy" eventKey="Economy">
                      Economy
                    </Dropdown.Item>
                    <Dropdown.Item
                      key="Premium Economy"
                      eventKey="Premium Economy"
                    >
                      Premium Economy
                    </Dropdown.Item>
                    <Dropdown.Item key="Business" eventKey="Business">
                      Business
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            />
          </Form.Group>
        </Col>

        <Col
          xs={12}
          md={6}
          className="d-flex ps-md-1 ps-lg-4 mb-lg-0 mb-sm-4 mb-md-0"
        >
          <Form.Group as={Col} controlId="email1">
            <Form.Label className="col-3 w-lg-20 d-flex my-auto fs-5 flex-wrap">
              <p className="m-0">
                Email<span className="text-danger">*</span>
              </p>
            </Form.Label>
            <Form.Control
              type="email"
              name="email1"
              placeholder="please enter your email"
              defaultValue={email}
              className="col-9 w-lg-80 px-3 py-2 border-1 border-secondary rounded-0 lh-lg my-4 my-sm-0 my-md-3 h-50px"
              {...register("email", { required: true })}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default PassengerFormBody;
