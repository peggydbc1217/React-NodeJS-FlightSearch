import { Form, Button } from "react-bootstrap";
import styles from "./ResetPassword.module.scss";
import { resetPassword } from "../../../services/myServerApi";
import { toast } from "react-hot-toast";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadingStart, loadingComplete } from "../../Loading/loadingSlice";

function ResetPasswordForm() {
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

    const { token, password, passwordConfirm } = data;
    try {
      if (data.password !== data.passwordConfirm) {
        toast.error("Password and Confirm Password are not matched");
        dispatch(loadingComplete());
        return;
      }
      const res = await resetPassword(password, passwordConfirm, token);

      if (res.status === 200) {
        setTimeout(() => {
          navigate("/user/login");
          dispatch(loadingComplete());
          window.scrollTo(0, 0);
        }, 3000);
      }
      setTimeout(() => {}, 5000);
    } catch (err) {
      dispatch(loadingComplete());
    }
  };
  const onError = (errors, e) => {
    errors.token && toast.error("Token is required");
    errors.password && toast.error("Password is required");
    errors.passwordConfirm && toast.error("Password Confirm is required");
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Form.Group className="mb-3 text-start" controlId="exampleInputEmail1">
        <Form.Label className="form-label fs-5">Token</Form.Label>
        <Form.Control
          type="text"
          placeholder="Please input the token you received in your email inbox."
          className={`${styles["login-input-validate"]} border-secondary`}
          {...register("token", { required: true })}
          minLength={20}
        />
        <label
          className={`rounded-0 fs-6 h-100 text-danger ${styles["login-input-validate-label"]}`}
        ></label>
      </Form.Group>
      <Form.Group className="mb-3  text-start" controlId="pwd">
        <Form.Label className="form-label fs-5">New Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter new password"
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
      <Form.Group className="mb-3  text-start" controlId="Confirmpwd">
        <Form.Label className="form-label fs-5">Confirm Password</Form.Label>
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

      {/* BUTTON */}
      <div className="d-flex justify-content-center">
        <Button
          type="submit"
          variant="warning"
          className={`${styles["btn-hover"]} btn btn-primary w-50 me-3 rounded-0`}
          disabled={isloading}
        >
          Reset Password
        </Button>
      </div>
    </Form>
  );
}

export default ResetPasswordForm;
