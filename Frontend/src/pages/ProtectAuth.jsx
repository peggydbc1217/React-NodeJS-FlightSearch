import { useSelector } from "react-redux";
import Error from "./Error";

function ProtectAuth({ children }) {
  const user = useSelector((state) => state.user?.currentUser) || {};
  const hasUser = Object.keys(user).length > 0;

  return (
    <>
      {!hasUser ? (
        <Error message="You are not logged in" type="login"></Error>
      ) : (
        children
      )}
    </>
  );
}

export default ProtectAuth;
