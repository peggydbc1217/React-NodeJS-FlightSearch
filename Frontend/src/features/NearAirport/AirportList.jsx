import AirportItem from "./AirportItem";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

function AirportList() {
  const airports = useSelector((state) => state.nearAirports?.airports) || [];

  return (
    <Col
      lg={3}
      xs={12}
      className="overflow-auto"
      style={{ maxHeight: "600px" }}
    >
      {airports.map((airport, i) => {
        if (!airport.type || !airport.iata_code || i > 10) return null;

        const id = uuidv4();
        return <AirportItem key={id} airport={airport} />;
      })}
    </Col>
  );
}

export default AirportList;
