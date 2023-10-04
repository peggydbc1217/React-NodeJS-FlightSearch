import AccountOption from "./AccountOption";
import { loginOptions, logoutOptions } from "../../services/constant";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

function AccountBar() {
  const user = useSelector((state) => state.user?.currentUser) || {};

  let AccountOptions;
  if (Object.keys(user).length !== 0) {
    AccountOptions = logoutOptions;
  } else {
    AccountOptions = loginOptions;
  }

  return (
    <ul
      className={`list-unstyled d-flex ms-lg-5 ms-sm-3 mb-0 flex-row bg-lg-primary gap-sm-4 gap-3`}
    >
      {}
      {AccountOptions.map((option) => {
        const uniqueId = uuidv4();
        return <AccountOption key={uniqueId} option={option}></AccountOption>;
      })}
    </ul>
  );
}

export default AccountBar;
