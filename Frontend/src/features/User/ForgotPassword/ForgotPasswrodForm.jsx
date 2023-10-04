import { Form, Button } from "react-bootstrap";
import styles from "./ForgotPassword.module.scss";
import { forgotPassword } from "../../../services/myServerApi";
import { toast } from "react-hot-toast";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadingStart, loadingComplete } from "../../Loading/loadingSlice";

function ForgotPasswordForm() {
  const isloading = useSelector((state) => state.loading?.isLoading);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    dispatch(loadingStart());
    const { email } = data;
    try {
      const res = await forgotPassword(email);

      if (res.status === 200) {
        navigate("/user/resetPassword");
        dispatch(loadingComplete());
      }
      setTimeout(() => {}, 5000);
    } catch (err) {
      dispatch(loadingComplete());
    }
  };
  const onError = (errors, e) => {
    errors.email && toast.error("email is required");
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Form.Group className="mb-3 text-start" controlId="exampleInputEmail1">
        <Form.Label className="form-label fs-5">Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          className={`${styles["login-input-validate"]} border-secondary`}
          {...register("email", { required: true })}
          minLength={8}
          defaultValue={"peggydbc1217@gmail.com"}
        />
        <label
          className={`rounded-0 fs-6 h-100 text-danger ${styles["login-input-validate-label"]}`}
        >
          Email shoud be like flightease@xxx
        </label>
      </Form.Group>

      <div className="d-flex justify-content-center">
        <Button
          type="submit"
          variant="warning"
          className={`${styles["btn-hover"]} btn btn-primary w-50 me-3 rounded-0`}
          disabled={isloading}
        >
          Send
        </Button>
      </div>
    </Form>
  );
}

export default ForgotPasswordForm;
