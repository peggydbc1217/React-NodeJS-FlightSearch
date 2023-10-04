import React from "react";
import MyOrderItem from "../../features/Account/MyOrder/MyOrderItem";
import { v4 as uuidv4 } from "uuid";
import NoItem from "../../ui/NoItem";
import Loader from "../../ui/Loader";
import Error from "../Error";
import { useCustomQuery } from "../../CustomHook/useCustomQuery";

function MyOrderList() {
  const { isLoading, myOrders, error } = useCustomQuery("myOrders", "myOrders");

  if (isLoading) return <Loader></Loader>;
  if (error) return <Error message={error.message}></Error>;

  return (
    <ul className={`d-flex flex-column ps-0`}>
      {myOrders.length === 0 && <NoItem itemName="Order"></NoItem>}
      {myOrders.map((order) => {
        const uniqueId = uuidv4();
        return <MyOrderItem key={uniqueId} order={order}></MyOrderItem>;
      })}
    </ul>
  );
}

export default MyOrderList;
