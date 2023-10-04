import { Container } from "react-bootstrap";
import PassengerInfoForm from "../../features/FlightSearch/PassengerInfo/PassengerInfoForm";

function PassengerInfo() {
  return (
    <Container className="mt-5 position-relative">
      <PassengerInfoForm></PassengerInfoForm>
    </Container>
  );
}

export default PassengerInfo;
