import React from "react";
import { Row, Col, Form } from "react-bootstrap";

function InputPassword({ title, register, isCheck }) {
  const fullTitle = title.split(" ").join("");

  return (
    <Row className={`justify-content-center justify-content-lg-start mt-3`}>
      <Col xs={8}>
        <Form.Group controlId={title}>
          <Form.Label>{title}</Form.Label>
          <Form.Control
            type={isCheck ? `text` : `password`}
            name={fullTitle}
            className="
            "
            autoComplete="off"
            {...register(fullTitle, { required: true, min: 8 })}
          />
        </Form.Group>
      </Col>
    </Row>
  );
}

export default InputPassword;
