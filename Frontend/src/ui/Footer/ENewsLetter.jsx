import React from "react";
import { useSelector } from "react-redux";

import { Button } from "react-bootstrap";
import { Container, Form } from "react-bootstrap";
import styles from "./ENewsLetter.module.scss"; // Import your SCSS module styles
import ENewsLetterHeader from "./ENewsLetterHeader";

import { sendSubscribeEmail } from "../../services/emailApi";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { tlds } from "@hapi/tlds";
import useLazyBackgroundImg from "../../CustomHook/useLazyBackgroundImg";
import {
  loadingComplete,
  loadingStart,
} from "../../features/Loading/loadingSlice";
import { useDispatch } from "react-redux";

const Footer = () => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: tlds } })
      .trim()
      .required(),
  });

  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });

  const loading = useSelector((state) => state.loading?.isLoading);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const enteredEmail = data.email;
    dispatch(loadingStart());
    await sendSubscribeEmail(enteredEmail);
    dispatch(loadingComplete());
    reset();
  };

  const onError = (errors, e) => {
    if (errors?.email) toast.error(errors.email.message);
  };

  const loaded = useLazyBackgroundImg("/images/homepage/eNewsLetter.jpg");

  return (
    <Container
      className={`${styles["footer-eNewsLetter-img-height"]} ${styles["bg-cover"]} ${styles["py-32"]} ${styles["py-sm-64"]} px-4 ${styles["px-sm-40"]} z-1 } ${styles["translateY-50"]}`}
      style={{
        backgroundImage: `url(${
          loaded || "/images/homepage/eNewsLetter-low.jpg"
        })`,
      }}
    >
      <ENewsLetterHeader />
      <Form
        className={`d-flex gap-2`}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="text-center">
          <input
            type="email"
            className={`form-control rounded-0 ps-4 ${styles[""]} ${styles["newsletter-input"]} fs-6 h-100`}
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
              minLength: 15,
              maxLength: 50,
            })}
          />

          <label
            className={`rounded-0 ${styles[""]} fs-6 h-100 ${styles["newsletter-input-label"]}`}
          >
            {errors.email?.type === "minLength"
              ? "Min 15 characters"
              : "Hit subscribe!🚀"}
          </label>
        </div>
        <Button
          type="submit"
          variant="warning"
          className={`btn  text-secondary rounded-0 fw-bold ${styles["py-12"]} px-4 py-0  `}
          disabled={loading}
        >
          Subscribe
        </Button>
      </Form>
    </Container>
  );
};

export default Footer;
