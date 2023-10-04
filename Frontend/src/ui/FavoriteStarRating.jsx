import { useState } from "react";
import FavoriteStar from "./FavoriteStar";

const containerStyle = {
  display: "flex",
  alighItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

export default function StarRating({
  maxRating = 5,
  color = "#FCC419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  isAddToFavorite,
  onAddToFavorite,
}) {
  const [fill, setFill] = useState(false);

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <FavoriteStar
            key={i}
            full={fill}
            onRate={() => {
              setFill(true);
              onAddToFavorite(true);
            }}
            onHoverIn={() => {
              if (!isAddToFavorite) setFill(true);
            }}
            onHoverOut={() => {
              if (!isAddToFavorite) setFill(false);
            }}
            color={color}
            size={size}
          ></FavoriteStar>
        ))}
      </div>
    </div>
  );
}
