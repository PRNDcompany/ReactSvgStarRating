import React, { useState, MouseEvent, useEffect } from "react";
import classNames from "classNames";
import Star from "./Star";

interface StarRatingProps {
  unit?: "full" | "half" | "float";
  size?: number;
  count?: number;
  innerRadius?: number;
  outerRadius?: number;
  activeColor?: string;
  hoverColor?: string;
  emptyColor?: string;
  roundedCorner?: boolean;
  handleOnClick?: (rating: number) => void;
  isReadOnly?: boolean;
  initialRating?: number;
  containerClassName?: string;
  starClassName?: string;
}

const DEFAULT_ACTIVE_COLOR = "#ffd055";
const DEFAULT_HOVER_COLOR = "#ffebb7";
const starUnitMap = {
  full: 100,
  half: 50,
  float: 10,
};
const StarRating: React.FC<StarRatingProps> = ({
  size = 30,
  count = 5,
  innerRadius = 25,
  outerRadius = 50,
  activeColor = DEFAULT_ACTIVE_COLOR,
  hoverColor = DEFAULT_HOVER_COLOR,
  roundedCorner = true,
  handleOnClick,
  isReadOnly = false,
  initialRating = 0,
  starClassName,
  containerClassName,
  emptyColor = "#ddd",
  unit = "full",
}) => {
  const [hoverValue, setHoverValue] = useState(0);
  const [selectedValue, setSelectedValue] = useState(0);
  const unitValue = starUnitMap[unit];
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
    const value = e.nativeEvent.offsetX / size + index;
    setSelectedValue(e.nativeEvent.offsetX / size + index);
    if (handleOnClick) {
      if (unit === "full") {
        handleOnClick(Math.ceil(value));
      } else if (unit === "half") {
        handleOnClick(Math.ceil(value / 0.5) * 0.5);
      } else {
        handleOnClick(Number((Math.ceil(value / 0.1) * 0.1).toFixed(1)));
      }
    }
  };

  const getHoverOffsetPercent = (starIndex: number) => {
    const roundedValue = Math.floor(hoverValue);
    if (starIndex < roundedValue) {
      return 100;
    } else if (starIndex > roundedValue) {
      return 0;
    } else {
      const currentStarOffsetPercentage = (hoverValue % 1) * 100;
      return Math.ceil(currentStarOffsetPercentage / unitValue) * unitValue;
    }
  };

  const getSelectedOffsetPercent = (starIndex: number) => {
    const roundedSelectedValue = Math.floor(selectedValue);
    if (starIndex < roundedSelectedValue) {
      return 100;
    } else if (starIndex > roundedSelectedValue) {
      return 0;
    } else {
      const currentStarOffsetPercentage = (selectedValue % 1) * 100;
      return Math.ceil(currentStarOffsetPercentage / unitValue) * unitValue;
    }
  };

  return (
    <span
      className={classNames(containerClassName)}
      style={{ display: "flex" }}
    >
      {Array.from({ length: count }, (v, i) => {
        const isHover = getHoverOffsetPercent(i) > 0;
        const offset = isHover
          ? getHoverOffsetPercent(i)
          : getSelectedOffsetPercent(i);
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
    </span>
  );
};

export default StarRating;
