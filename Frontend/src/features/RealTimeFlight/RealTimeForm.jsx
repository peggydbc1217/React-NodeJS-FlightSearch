import { Container, Form, Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styles from "./RealTimeForm.module.scss";
import { getRealTimeFlights } from "../../services/airLabApi";
import { loadingStart, loadingComplete } from "../Loading/loadingSlice";
import { useCustomQuery } from "../../CustomHook/useCustomQuery";
import { queryParamsToSet } from "../../services/constant";

function RealTimeForm() {
  const { register, handleSubmit } = useForm();

  const { realTimeFlightSuggestions } = useCustomQuery(
    "realTimeFlightSuggestions",
    "realTimeFlightSuggestions"
  );

  const hasSuggestions = realTimeFlightSuggestions?.length > 0;

  const reailTimeFlightSuggestionOne =
    realTimeFlightSuggestions?.[0]?.flight_iata || "";

  const reailTimeFlightSuggestionTwo =
    realTimeFlightSuggestions?.[1]?.flight_iata || "";

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(loadingStart());
    try {
      const flightData = await getRealTimeFlights(data.flight_iata);
      //set searchParams, transfer it to RealTimeMap.jsx
      queryParamsToSet.forEach((param) => {
        searchParams.set(param, flightData[param]);
      });
      setSearchParams(searchParams);
      toast.success("Flight information retrieved successfully");
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      dispatch(loadingComplete());
    }
  };

  return (
    <Container
      fluid
      className="border p-5 "
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(/images/homepage/bg.png)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label
            htmlFor="realTimeSearchParams"
            className={`${styles["cursor-pointer"]} h2 fw-bold`}
          >
            Enter Flight Information
          </Form.Label>
          <Form.Control
            type="text"
            id="realTimeSearchParams"
            placeholder={` EX.${
              hasSuggestions
                ? reailTimeFlightSuggestionOne +
                  "/" +
                  reailTimeFlightSuggestionTwo
                : "VJ842"
            }, Please enter the flight number that is currently in the air`}
            required
            className={`${styles["formInfo"]} text-secondary `}
            {...register("flight_iata", { required: true, min: 3 })}
          />
          <Form.Label
            className={`${styles["formInfo-label"]} d-block mt-1 ms-3`}
          >
            EX.
            {hasSuggestions
              ? reailTimeFlightSuggestionOne +
                "/" +
                reailTimeFlightSuggestionTwo
              : "VJ842"}{" "}
            Please enter the flight number that is currently in the air
          </Form.Label>
        </Form.Group>
        <Button
          type="submit"
          variant="warning"
          className="px-5 py-2 rounded-0 mt-3 fw-bold"
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default RealTimeForm;
