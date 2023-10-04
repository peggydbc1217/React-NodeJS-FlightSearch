import { Form, Button } from "react-bootstrap";
import styles from "./LoginForm.module.scss";
import { login } from "../../../services/myServerApi";
import { toast } from "react-hot-toast";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadingStart, loadingComplete } from "../../Loading/loadingSlice";
import { setCurrentUser } from "../userSlice";
import { Link } from "react-router-dom";

function LoginForm() {
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
    const { email, password } = data;
    try {
      const res = await login(email, password);

      if (res.status === 200) {
        toast.success(
          "Login successfully, waiting for switching to Homepage 😊"
        );
        dispatch(setCurrentUser(res.data.data.user));

        setTimeout(() => {
          navigate("/");
          dispatch(loadingComplete());
          window.scrollTo(0, 0);
        }, 2000);
      }
    } catch (err) {
      dispatch(loadingComplete());
    }
  };
  const onError = (errors, e) => {
    errors.email && toast.error("Email is required");
    errors.password && toast.error("Password is required");
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
        />
        <label
          className={`rounded-0 fs-6 h-100 text-danger ${styles["login-input-validate-label"]}`}
        >
          Email shoud be like flightease@xxx
        </label>
      </Form.Group>
      <Form.Group className="mb-3 text-start" controlId="exampleInputPassword1">
        <Form.Label className="form-label fs-5">Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Password"
          className={` ${styles["login-input-validate"]} border-secondary `}
          minLength={8}
          {...register("password", { required: true })}
        />
        <label
          className={`rounded-0 fs-6 h-100 text-danger ${styles["login-input-validate-label"]}`}
        >
          Mininum 8 characters
        </label>
      </Form.Group>
      <div className="d-flex justify-content-between">
        <Button
          type="submit"
          variant="warning"
          className={`${styles["btn-hover"]} btn btn-primary w-50 me-3 rounded-0`}
          disabled={isloading}
        >
          Login
        </Button>

        <Link
          to="/user/forgotPassword"
          className={`${styles["btn-hover"]} btn btn-light w-50 rounded-0 `}
          onClick={isloading ? (e) => e.preventDefault() : () => {}}
        >
          Forgot Password
        </Link>
      </div>
    </Form>
  );
}

export default LoginForm;
