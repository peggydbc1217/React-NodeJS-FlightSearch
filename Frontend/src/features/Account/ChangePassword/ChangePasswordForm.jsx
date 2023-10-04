import { Row, Col, Form, Button } from "react-bootstrap";
import { updatePassword, logout } from "../../../services/myServerApi";
import Spacer from "../../../ui/Spacer";
import InputPassword from "./InputPassword";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../../User/userSlice";
import { loadingComplete, loadingStart } from "../../Loading/loadingSlice";

const titles = [
  "Enter Current Password",
  "Enter New Password",
  "Confirm New Password",
];

function ChangePasswordForm() {
  const { register, handleSubmit, reset } = useForm();

  const [isCheck, setIsCheck] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    dispatch(loadingStart());

    try {
      const { EnterCurrentPassword, EnterNewPassword, ConfirmNewPassword } =
        data;

      if (EnterNewPassword !== ConfirmNewPassword) {
        throw new Error("New password and confirm password must be the same");
      }

      const res = await updatePassword(
        EnterCurrentPassword,
        EnterNewPassword,
        ConfirmNewPassword
      );

      if (res.status === 200) {
        toast.success("Password updated successfully");
        reset();
        logout();
        dispatch(setCurrentUser({}));
        navigate("/user/login");
      } else {
        throw new Error("Failed to update password");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      dispatch(loadingComplete());
    }
  };

  const onError = (errors, e) => {
    titles.map((title) => {
      const fullTitle = title.split(" ").join("");
      if (errors[fullTitle]) {
        toast.error(`${title} is required and at least 8 characters`);
      }
    });
  };

  return (
    <Form className={`ms-lg-5`} onSubmit={handleSubmit(onSubmit, onError)}>
      {titles.map((title, i) => {
        return (
          <div key={uuidv4()}>
            <InputPassword
              title={title}
              register={register}
              isCheck={isCheck}
            ></InputPassword>
            {i === 0 && <Spacer></Spacer>}
          </div>
        );
      })}

      <Row>
        <Col className="d-flex justify-content-center ">
          <Form.Check
            type="checkbox"
            id="checkbox"
            label="Show Password"
            checked={isCheck}
            onChange={() => {
              setIsCheck((check) => !check);
            }}
            className="mt-4 text-primary fs-5"
          />
        </Col>
      </Row>

      <Row
        className={`flex-column flex-lg-row align-items-center justify-content-center mt-4`}
      >
        <Button
          variant={`secondary`}
          className={`col-7 col-lg-2 mb-2 me-lg-2 rounded-0`}
          onClick={() => {
            reset();
          }}
        >
          Discard
        </Button>
        <Button
          type="submit"
          variant={`warning`}
          className={`col-7 col-lg-2 mb-2 rounded-0`}
        >
          Save
        </Button>
      </Row>
    </Form>
  );
}

export default ChangePasswordForm;
