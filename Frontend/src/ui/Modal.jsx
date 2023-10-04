import React from "react";
import { Button, Modal } from "react-bootstrap";

function ModalComponent({ show, onSetShow, title, MessageComponent }) {
  return (
    <Modal
      size="lg"
      show={show}
      onHide={() => onSetShow(false)}
      centered
      scrollable={true}
      className="w-100"
    >
      <Modal.Header closeButton>
        <Modal.Title>📧 {title}📧 </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {MessageComponent}
        {/* <p className="h5 text-center font-weight-bold mb-3">
          Hey😄, I've set up a real email service. 📧
          </p>
          <p className="h5 text-center font-weight-bold mb-3">
          It'd be great if you could share your actual email.
          </p>
          <p className="h5 text-center font-weight-bold mb-3">
          If it's not possible, you can keep going.😊👍
        </p> */}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="warning"
          className="rounded-0"
          onClick={() => onSetShow(false)}
        >
          Back
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent;
