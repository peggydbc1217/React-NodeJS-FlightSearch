import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import SearchResultsItem from "./SearchResultsItem";
import { v4 as uuidv4 } from "uuid";
import { PAGE_PER_ROW } from "../../services/constant";

function DelaySearchResultsMain() {
  const flight = useSelector((state) => state.delayedFlights.flight);

  const currentPage = useSelector((state) => state.delayedFlights.currentPage);

  // 5    1:0-4  2:5-9  3:10-14  4:15-19  5:20-24
  const start = (currentPage - 1) * PAGE_PER_ROW;
  const end = currentPage * PAGE_PER_ROW - 1;
  const flightPerPage = flight?.slice(start, end + 1) || 0;

  return (
    <Container className="mt-5">
      <ul className="list-unstyled">
        {flightPerPage.map((airplane, i) => {
          const uniqueId = uuidv4();
          return (
            <SearchResultsItem
              flight={airplane}
              key={uniqueId}
            ></SearchResultsItem>
          );
        })}
      </ul>
    </Container>
  );
}

export default DelaySearchResultsMain;
