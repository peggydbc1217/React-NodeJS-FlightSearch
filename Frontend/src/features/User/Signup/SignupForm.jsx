import React from "react";
import { Form, Button, Modal } from "react-bootstrap";

import styles from "./Signup.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setTempUser } from "../userSlice";
import { toast } from "react-hot-toast";
import { signup } from "../../../services/myServerApi";
import { useNavigate } from "react-router-dom";
import { loadingStart, loadingComplete } from "../../Loading/loadingSlice";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { tlds } from "@hapi/tlds";

const schema = Joi.object({
  name: Joi.string()
    .required()
    .min(2)
    .regex(/^[A-Za-z]+$/)
    .message("Name can only contain more than 2 alphabetic characters"),
  password: Joi.string().min(8).required(),
  passwordConfirm: Joi.string().min(8).required(),
  email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .trim()
    .required(),
  term: Joi.boolean().valid(true),
});

function SignupForm() {
  //MODAL STATE
  const [show, setShow] = useState(false);

  const user = useSelector((state) => state.user?.tempUser) || {};

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, control } = useForm({
    resolver: joiResolver(schema),
  });

  const handleSignup = async () => {
    dispatch(loadingStart());
    try {
      setShow(false);

      const res = await signup(user);
      if (res.status === 201) {
        toast.success(
          "Signup successfully, waiting for switching to login page 😊"
        );
        dispatch(setTempUser([]));
        setTimeout(() => {
          navigate("/user/login");
          dispatch(loadingComplete());
        }, 3000);
      }
    } catch (err) {
      dispatch(loadingComplete());
    }
  };

  const onSubmit = (data) => {
    if (data.password !== data.passwordConfirm) {
      toast.error("Password and Confirm Password are not matched");
      return;
    }

    // add role to user
    data.role = "user";
    // console.log(data);
    dispatch(setTempUser(data));
    setShow(true);
  };

  const onError = (errors, e) => {
    errors.email && toast.error(errors.email.message);
    errors.password && toast.error(errors.password.message);
    errors.passwordConfirm && toast.error(errors.passwordConfirm.message);
    errors.name && toast.error(errors.name.message);
    errors.term && toast.error("Please accept our terms of service");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Form.Group className="mb-3" controlId="account">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          className={`${styles["signup-input-validate"]} border-secondary`}
          {...register("name", { required: "Username is required" })}
          minLength={3}
        />

        <label
          className={`rounded-0 fs-6 h-100 text-danger ${styles["signup-input-validate-label"]}`}
        >
          Mininum 3 characters
        </label>
      </Form.Group>
      <Form.Group className="mb-3" controlId="mail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          className={`${styles["signup-input-validate"]} border-secondary`}
          {...register("email", { required: "Email Address is required" })}
        />

        <label
          className={`rounded-0 fs-6 h-100 text-danger ${styles["signup-input-validate-label"]}`}
        >
          Email shoud be like flightease@xxx
        </label>
      </Form.Group>
      <Form.Group className="mb-3" controlId="pwd">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          className={`${styles["signup-input-validate"]} border-secondary`}
          {...register("password", { required: "Password is required" })}
          minLength={8}
        />
        <label
          className={`rounded-0 fs-6 h-100 text-danger ${styles["signup-input-validate-label"]}`}
        >
          Mininum 8 characters
        </label>
      </Form.Group>
      <Form.Group className="mb-3" controlId="Confirmpwd">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm password"
          className={`${styles["signup-input-validate"]}  border-secondary`}
          {...register("passwordConfirm", {
            required: "Confirm Password is required",
          })}
          minLength={8}
        />
        <label
          className={`rounded-0 fs-6 h-100 text-danger ${styles["signup-input-validate-label"]}`}
        >
          Mininum 8 characters
        </label>
      </Form.Group>
      <Form.Group className="mb-3 text-start form-check">
        <Controller
          name="term"
          control={control}
          defaultValue={true}
          render={({ field }) => (
            <>
              <Form.Check
                type="checkbox"
                id="termCheck"
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
              />
              <Form.Label htmlFor="termCheck" style={{ cursor: "pointer" }}>
                I agree to accept FlightEase{" "}
                <Link to="#">Terms of Service</Link> and{" "}
                <Link to="#">Privacy Policy</Link>
              </Form.Label>
            </>
          )}
        />
      </Form.Group>
      <Button
        type="submit"
        variant="warning"
        className={`${styles["btn-hover"]} btn btn-primary col-12 p-3`}
        // onClick={() => setShow(true)}
      >
        Register
      </Button>

      {/* MODAL */}
      <Modal size="lg" show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton className="bg-primary">
          <Modal.Title>📧 Notification 📧 </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="h5 text-center font-weight-bold mb-3">
            Hey😄, I've set up a{" "}
            <span className="fw-bold text-success fs-4">
              real email service.
            </span>{" "}
            📧
          </p>
          <p className="h5 text-center font-weight-bold mb-3">
            It'd be great if you could share your actual email.
          </p>
          <p className="h5 text-center font-weight-bold mb-3">
            If it's not possible, you can keep going.😊👍
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button
            variant="warning"
            className="text-secondary py-2 px-4  fw-bold"
            onClick={handleSignup}
          >
            Keep going
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
}

export default SignupForm;
