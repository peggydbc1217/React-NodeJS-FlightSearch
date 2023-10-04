import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { bookTicket } from "../../../services/Strip";
import { useSelector } from "react-redux";

function PassengerFooter({ show, onSetClose }) {
  const { _id } = useSelector((state) => state.booking.tempBooking);

  const handlePayment = async () => {
    onSetClose();
    await bookTicket(_id);
  };

  return (
    <>
      <div className="formFooter d-flex justify-content-end">
        <Button
          variant="warning"
          type="submit"
          className=" rounded-0 text-secondary py-2 px-4 fs-5 fw-bold d-block"
        >
          Go to Payment
        </Button>
      </div>
      {
        <Modal size="lg" show={show} onHide={onSetClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Booking Completed ✅ </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="h5 text-center font-weight-bold mb-3">
              Please use the following credit card number for the payment:
            </p>
            <p className="text-center font-weight-bold h3 text-secondary">
              4242 4242 4242 4242
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onSetClose}>
              Close
            </Button>
            <Button
              variant="warning"
              className="text-secondary py-2 px-4 fs-5 fw-bold"
              onClick={handlePayment}
            >
              Go to Payment
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </>
  );
}

export default PassengerFooter;
