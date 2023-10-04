import React, { useEffect } from "react";
import styles from "./FlightSearchCarousel.module.scss";
import FlightSearchArrows from "./FlightSearchArrows";
import Col from "react-bootstrap/Col";
import FlightSearchCarouselItem from "./FlightSearchCarouselItem";
import { useState } from "react";

let flightSearchCarouselImages = [
  "flightSearch.jpg",
  "flightSearch-2.png",
  "flightSearch-3.png",
];

const flightSearchImageLength = flightSearchCarouselImages.length;

function FlightSearchCarousel() {
  const [currentImage, setCurrentImage] = useState(1);
  const [renderImages, setRenderImages] = useState([]);

  function pushRenderImages(curImg) {
    // Calculate the index of the previous image
    const prevIndex = curImg === 0 ? flightSearchImageLength - 1 : curImg - 1;

    // Calculate the index of the next image
    const nextIndex = (curImg + 1) % flightSearchImageLength;

    const updatedImages = [
      flightSearchCarouselImages[prevIndex],
      flightSearchCarouselImages[curImg],
      flightSearchCarouselImages[nextIndex],
    ];

    setRenderImages(updatedImages);
  }

  function goToNextImage(e) {
    if (e) {
      e.preventDefault();
    }

    setCurrentImage((cur) => {
      if (cur === flightSearchImageLength - 1) {
        return 0;
      } else {
        return cur + 1;
      }
    });
  }

  function goToPrevImage(e) {
    if (e) {
      e.preventDefault();
    }
    setCurrentImage((cur) => {
      if (cur === 0) {
        return flightSearchImageLength - 1;
      } else {
        return cur - 1;
      }
    });
  }

  useEffect(() => {
    pushRenderImages(currentImage);
  }, [currentImage]);

  //automatically change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextImage();
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <Col lg={7} className={`${styles["mt-0"]}  mt-lg-0 p-0 position-relative`}>
      <FlightSearchArrows
        onClickNext={goToNextImage}
        onClickPrev={goToPrevImage}
      ></FlightSearchArrows>

      <div className="overflow-hidden">
        <ul
          className="list-unstyled d-flex justify-content-center mb-0"
          style={{
            whiteSpace: "nowrap",
            width: `${flightSearchImageLength * 80}%`,
          }}
        >
          {renderImages.map((image, index) => {
            const isActive = index === 1;
            return (
              <FlightSearchCarouselItem
                imageName={image}
                key={image}
                isActive={isActive}
              ></FlightSearchCarouselItem>
            );
          })}
        </ul>
      </div>
    </Col>
  );
}

export default FlightSearchCarousel;
