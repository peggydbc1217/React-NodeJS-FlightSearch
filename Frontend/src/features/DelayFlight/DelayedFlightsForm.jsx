import { Form, Button } from "react-bootstrap";
import styles from "../../ui/Custom.module.scss";
import FormInputCheckbox from "./FormInputCheckbox";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";

import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import useAirPortDebounce from "../../CustomHook/useAirPortDebounce";
import { useState } from "react";
import { fetchDelayedFlights } from "./delayedFlightsSlice";
import Loader from "../../ui/Loader";

function DelayedFlightsForm() {
  const dispatch = useDispatch();

  //Wait for importing airlinefullname library(1mb)
  const delayedFlightLoading = useSelector(
    (state) => state.delayedFlights.loading
  );

  const [inputValue, setInputValue] = useState("");

  // auto complete airport data
  const { ariportOptions: options } = useAirPortDebounce(inputValue, 500);

  const [value, setValue] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (!value && !inputValue) {
      toast.error("Please select an IATA code");
      return;
    }

    const iata = value ? value.iata : inputValue;

    try {
      dispatch(fetchDelayedFlights({ type: data.type, iata: iata }));
    } catch (error) {
      console.log(error);
    }
  };

  const onError = (errors, e) => {
    console.log(errors);
  };

  return (
    <>
      {delayedFlightLoading && <Loader></Loader>}

      <Form
        className={`${styles["bg-cover"]} border p-5`}
        style={{
          backgroundImage: `linear-gradient(
              rgba(255, 255, 255, 0.8),
              rgba(255, 255, 255, 0.8)
            ),
            url(/images/homepage/bg.png)`,
        }}
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <FormInputCheckbox
          amount={2}
          title="Select Dep/Arr"
          name="flightDepArr"
          id={["depFlight", "arrFlight"]}
          description={["departures", "arrivals"]}
          register={register}
        ></FormInputCheckbox>

        <div className="mt-3 mb-3">
          <Form.Label
            htmlFor="airportIata"
            className={`form-label ${styles["cursor-pointer"]} h2 mb-3`}
          >
            Enter Airport IATA Code
          </Form.Label>

          <Autocomplete
            disablePortal
            id="airportIata"
            freeSolo
            options={options}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.iata}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            sx={{ width: 1 }}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.country_code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.country_code.toLowerCase()}.png 2x`}
                  alt=""
                />
                {option.iata}, {option.airport} ({option.country_code})
              </Box>
            )}
            renderInput={(params) => (
              <TextField {...params} label="E.g., TPE/BKK/FCO/AMS" />
            )}
          />
        </div>

        {/* <FormInputCheckbox
        amount={2}
        title="Select Query Method"
        name="flightSearchType"
        id={["airportIata", "flightIata"]}
        description={[
          "Enter Airport Code (e.g., TPE)",
          "Enter Flight Code (e.g., BR383)",
        ]}
      ></FormInputCheckbox> */}

        {/* <FormTextArea
        title="Enter Airport IATA Code"
        id="flightInfo"
        placeholder="E.g., TPE/BKK/FCO/AMS"
        required={true}
      ></FormTextArea> */}
        <Button
          type="submit"
          variant="warning"
          className="btn btn-primary px-5 py-2 rounded-0 mt-3 fw-bold"
        >
          Submit
        </Button>
      </Form>
    </>
  );
}

export default DelayedFlightsForm;
