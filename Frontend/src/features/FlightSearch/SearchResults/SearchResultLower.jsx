import React from "react";
import styles from "./SearchResults.module.scss";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-hot-toast";
import FavoriteStarRating from "../../../ui/FavoriteStarRating";
import { addFavorite } from "../../../services/myServerApi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTempBooking } from "../../Account/bookingSlice";
import { useSelector } from "react-redux";
import useLazyBackgroundImage from "../../../CustomHook/useLazyBackgroundImg";

function SearchResultLower({
  flight,
  isActive,
  airportNameAndCountry,
  onActive,
}) {
  const {
    flight_iata,
    dep_iata,
    dep_time,
    arr_iata,
    arr_time,
    duration,
    price,
  } = flight;

  const { arr_name, arr_country, dep_name, dep_country, arr_city, dep_city } =
    airportNameAndCountry || {};

  const loaded = useLazyBackgroundImage("/images/searchFormLowerBg.jpg");

  const user = useSelector((state) => state.user?.currentUser) || {};
  const [isAddToFavorite, setIsAddToFavorite] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdd = async (type) => {
    onActive((isActive) => !isActive);
    try {
      //check if there is a user
      if (Object.keys(user).length === 0) throw new Error("Please login first");

      // get user id
      const flight_target = {
        ...flight,
        arr_name,
        arr_country,
        dep_name,
        dep_country,
        arr_city,
        dep_city,

        //記得加入user id
        user: user._id,
      };

      if (type === "addFavorite" && !isAddToFavorite) {
        await addFavorite(flight_target);
        toast.success("Added to favorite. You can remove it in your profile.");
      }

      if (type === "bookFlight") {
        dispatch(setTempBooking(flight_target));
        navigate("/flightSearch/PassengerInfo");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <div
        className={`${styles["flightCard-rwd-width"]} ${
          styles["flightCard-lower"]
        } ${styles["px-12"]} justify-content-between gap-1 gap-sm-3 py-3 
        ${isActive && styles["flightCard-lower-active"]} position-relative`}
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${
            loaded || "/images/searchFormLowerBg-low.jpg"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: `${loaded ? "blur(0)" : "blur(10px)"}`,
        }}
      >
        <div
          className={`${styles["w-30"]} d-flex flex-column justify-content-between`}
        >
          <div className="d-flex  mb-3 gap-0">
            <span className={`fi fi-${dep_country?.toLowerCase()} w-50`}></span>
            <h3 className="mb-0 fw-bold text-secondary">{dep_iata}</h3>
          </div>
          <p
            className={`${styles["overflow-wrap-break"]} mb-3 text-secondary text-center`}
          >
            {dep_name}
          </p>
          <p className="text-center d-none d-sm-block">{dep_city}</p>
          <time className="text-center mb-1">{dep_time}</time>
          <p className="text-center">GMT+8</p>
        </div>
        <div
          className={`${styles["w-20"]} d-flex flex-column justify-content-between align-self-sm-center align-self-end align-items-center`}
        >
          <p className="d-block d-md-none mb-3 text-center h5 fw-bold">
            {flight_iata}
          </p>
          <h3 className="mb-3">{duration}mins</h3>
          <img
            className={`${styles["w-15"]} ${styles["moveUpandDown-animation"]} d-none d-sm-block mb-3`}
            src="/images/homepage/airplane-flightCard.png"
            alt="airplane"
          />
          <img
            className={`${styles["rwd-width-50-md-15"]} ${styles["arrow-moveIn-animation"]} d-block  mb-3 `}
            src="/images/homepage/right-arrow-blue.png"
            alt="rightArrow"
          />

          <strong className="fw-bold h2">${price}</strong>

          <Button
            variant="warning"
            className="rounded-0 fw-bold p-sm-2 p-1 mt-2"
            onClick={() => {
              handleAdd("bookFlight");
              window.scrollTo(0, 0);
            }}
          >
            Go to Book
          </Button>

          <Link onClick={() => handleAdd("addFavorite")}>
            <FavoriteStarRating
              className="mt-3"
              color="#eac14a"
              maxRating={1}
              isAddToFavorite={isAddToFavorite}
              onAddToFavorite={setIsAddToFavorite}
            ></FavoriteStarRating>
          </Link>
          <p className="text-secondary fw-bold text-center">
            Add to Favorites!
          </p>
        </div>
        <div
          className={`${styles["w-30"]} d-flex flex-column justify-content-between`}
        >
          <div className="d-flex mb-3">
            <span className={`fi fi-${arr_country?.toLowerCase()} w-50`}></span>
            <h3 className="mb-0 fw-bold text-secondary">{arr_iata}</h3>
          </div>
          <p
            className={`${styles["overflow-wrap-break"]} mb-3 text-secondary text-center `}
          >
            {arr_name}
          </p>
          <p className="d-none d-sm-block text-center">{arr_city}</p>
          <time className="d-block text-center mb-1">{arr_time}</time>
          <p className="text-center">GMT+8</p>
        </div>
      </div>
    </>
  );
}

export default SearchResultLower;
