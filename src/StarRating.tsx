import React, { useState, MouseEvent, useEffect } from "react";
import classNames from "classNames";
import Star from "./Star";

interface StarRatingProps {
  size?: number;
  count?: number;
  activeColor?: string;
  hoverColor?: string;
  emptyColor?: string;
  innerRadius?: number;
  outerRadius?: number;
  isHalfRating?: boolean;
  handleOnClick?: (rating: number) => void;
  roundedCorner?: boolean;
  isReadOnly?: boolean;
  initialRating?: number;
  starClassName?: string;
  containerClassName?: string;
  unit?: number;
}

const DEFAULT_ACTIVE_COLOR = "#ffd055";
const DEFAULT_HOVER_COLOR = "#ffebb7";
const StarRating: React.FC<StarRatingProps> = ({
  size = 30,
  count = 5,
  innerRadius = 25,
  outerRadius = 50,
  activeColor = DEFAULT_ACTIVE_COLOR,
  hoverColor = DEFAULT_HOVER_COLOR,
  roundedCorner = true,
  handleOnClick = () => {},
  isReadOnly = false,
  initialRating = 0,
  starClassName = "",
  containerClassName = "",
  emptyColor = "#ddd",
}) => {
  const [hoverValue, setHoverValue] = useState(0);
  const [selectedValue, setSelectedValue] = useState(0);

  useEffect(() => {
    if (initialRating !== 0) {
      setSelectedValue(initialRating);
    }
  }, [initialRating]);

  const handleStarMouseMove = (offsetX: number, index: number) => {
    if (isReadOnly) return;
    setHoverValue(index + offsetX / size);
  };

  const handleMouseOut = () => {
    if (isReadOnly) return;
    setHoverValue(0);
  };

  const handleStarClick = (e: MouseEvent, index: number) => {
    if (isReadOnly) return;
    setSelectedValue(e.nativeEvent.offsetX / size + index);
  };

  const getHoverOffset = (index: number) => {
    const roundedValue = Math.floor(hoverValue);
    if (index < roundedValue) {
      return 100;
    } else if (index > roundedValue) {
      return 0;
    } else {
      return (hoverValue % 1) * 100;
    }
  };

  const getSelectedOffset = (index: number) => {
    const roundedValue = Math.floor(selectedValue);
    if (index < roundedValue) {
      return 100;
    } else if (index > roundedValue) {
      return 0;
    } else {
      return (selectedValue % 1) * 100;
    }
  };

  return (
    <div className={classNames(containerClassName)} style={{ display: "flex" }}>
      {Array.from({ length: count }, (v, i) => {
        const isHover = getHoverOffset(i) > 0;
        const offset = isHover ? getHoverOffset(i) : getSelectedOffset(i);
        const filledColor = isHover ? hoverColor : activeColor;
        return (
          <Star
            key={i}
            index={i}
            size={size}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            filledColor={filledColor}
            emptyColor={emptyColor}
            handleStarMouseMove={handleStarMouseMove}
            handleMouseOut={handleMouseOut}
            handleStarClick={(e) => handleStarClick(e, i)}
            strokeLinejoin={roundedCorner ? "round" : "miter"}
            strokeLinecap={roundedCorner ? "round" : "butt"}
            className={starClassName}
            isReadOnly={isReadOnly}
            offset={offset}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
