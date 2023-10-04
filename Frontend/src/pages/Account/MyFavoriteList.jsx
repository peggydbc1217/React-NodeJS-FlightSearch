import React from "react";
import { v4 as uuidv4 } from "uuid";
import NoItem from "../../ui/NoItem";
import Loader from "../../ui/Loader";
import Error from "../Error";
import { useCustomQuery } from "../../CustomHook/useCustomQuery";
import MyFavoriteItem from "../../features/Account/Favorite/MyFavoriteItem";

function MyFavoriteList() {
  const { isLoading, myFavorites, error } = useCustomQuery(
    "myFavorites",
    "myFavorites"
  );

  if (isLoading) return <Loader></Loader>;
  if (error) return <Error message={error.message}></Error>;

  return (
    <ul className={`d-flex flex-column ps-0`}>
      {myFavorites.length === 0 && <NoItem itemName="Favorite"></NoItem>}
      {myFavorites.map((order) => {
        const uniqueId = uuidv4();
        return <MyFavoriteItem key={uniqueId} order={order}></MyFavoriteItem>;
      })}
    </ul>
  );
}

export default MyFavoriteList;
