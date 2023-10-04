import { Badge } from "react-bootstrap";
import styles from "./HotSpotsCardList.module.scss";
import StartList from "../../StartList";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import useLazyBackgroundImg from "../../../CustomHook/useLazyBackgroundImg";

function CardItemTop({ image, title, stars }) {
  const loaded = useLazyBackgroundImg(image);

  return (
    <LazyLoadComponent
      threshold={400}
      placeholder={<span>Loading images....</span>}
    >
      <div
        className={`${styles["bg-blend-mode-screen"]} ${styles["bg-cover"]} position-relative d-flex justify-content-end align-items-end 
${styles["card-img-height-rwd"]}`}
        style={{
          backgroundImage: `url(${loaded || image.split(".")[0] + "-low.jpg"})`,
          filter: `${loaded ? "none" : "blur(10px)"}`,
        }}
      >
        <Badge
          className={`bg-primary h4 px-4 py-2 py-sm-3 fw-bold position-absolute top-100 rounded-0 ${styles["start-13"]} ${styles["px-sm-40"]} translate-middle ${styles["badge"]}`}
          style={{ fontSize: "1rem" }}
        >
          {title}
        </Badge>
        <StartList starsLength={stars}></StartList>
      </div>
    </LazyLoadComponent>
  );
}

export default CardItemTop;
