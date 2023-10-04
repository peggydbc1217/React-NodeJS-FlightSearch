import React from "react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setAddTempBooking } from "../../Account/bookingSlice";
import { createBooking } from "../../../services/myServerApi";

import PassengerHeader from "./PassengerHeader";
import PassengerFormBody from "./PassengerFormBody";
import { Form } from "react-bootstrap";
import PassengerFooter from "./PassengerFooter";
import PassengerFormDescription from "./PassengerFormDescription";

import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { tlds } from "@hapi/tlds";

const schema = Joi.object({
  surname: Joi.string()
    .required()
    .min(2)
    .regex(/^[A-Za-z]+$/)
    .message("FirstName can only contain more than 2 alphabetic characters"),
  givenName: Joi.string()
    .required()
    .min(2)
    .regex(/^[A-Za-z]+$/)
    .message("GivenName can only contain more than 2 alphabetic characters"),
  email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .trim()
    .required(),
  flightClass: Joi.string().required(),
  amount: Joi.number().required(),
});

function PassengerInfoForm() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });

  const [selectedAmount, setSelectedAmount] = useState(1);
  const [selectedClass, setSelectedClass] = useState("Economy");

  const [isBookingCompleted, setIsBookingCompleted] = useState(false);

  const tempBooking = useSelector((state) => state.booking.tempBooking);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isNaN(tempBooking.price)) {
      window.scrollTo(0, 0);
      navigate("/");
    }
  }, [tempBooking.price, navigate]);

  //HANDEL MODAL SHOW
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const onSubmit = async (data) => {
    if (isBookingCompleted) {
      setShow(true);
      return;
    }

    try {
      //define price according to flight class
      let priceRate = 1;
      if (data.flightClass === "Premium Economy") {
        priceRate = 1.5;
      } else if (data.flightClass === "Business") {
        priceRate = 2;
      }

      // create booking
      const booking = {
        ...tempBooking,
        ...data,
        price: tempBooking.price * priceRate,
      };
      const res = await createBooking(booking);
      const CompletedBooking = res.data.data.data.doc;

      dispatch(setAddTempBooking(CompletedBooking));

      if (res.status === 201) {
        setShow(true);
        setIsBookingCompleted(true);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const onError = (errors, e) => {
    errors.surname && toast.error(errors.surname.message);
    errors.givenName && toast.error(errors.givenName.message);
    errors.email && toast.error(errors.email.message);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <PassengerHeader></PassengerHeader>
      <PassengerFormBody
        register={register}
        OnSetSelectedAmount={setSelectedAmount}
        OnSetSelectedClass={setSelectedClass}
        control={control}
      ></PassengerFormBody>
      <PassengerFormDescription
        selectedAmount={selectedAmount}
        selectedClass={selectedClass}
      ></PassengerFormDescription>
      <PassengerFooter
        onSetClose={handleClose}
        show={show}
        isBookingCompleted={isBookingCompleted}
      ></PassengerFooter>
    </Form>
  );
}

export default PassengerInfoForm;
