import Progressbar from "../../features/FlightSearch/ProgressBar";
import FormFooter from "../../features/FlightSearch/BookingCompleted/FormFooter";
import BookingHeader from "../../features/FlightSearch/BookingCompleted/BookingHeader";
import BookingDetails from "../../features/FlightSearch/BookingCompleted/BookingDetails";
import { Container } from "react-bootstrap";
import { Form } from "react-bootstrap";

function BookingCompleted() {
  return (
    <>
      <Container className=" mt-5">
        <Progressbar activePage={4}></Progressbar>
        <Form className="content">
          <BookingHeader></BookingHeader>
          <BookingDetails></BookingDetails>
          <FormFooter></FormFooter>
        </Form>
      </Container>
    </>
  );
}

export default BookingCompleted;
