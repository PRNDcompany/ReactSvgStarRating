import React, { useState, useCallback, useEffect, memo } from 'react';
import Star from './Star';

export enum DEFAULT_COLORS {
  DEFAULT_COLOR = '#ddd',
  DEFAULT_ACTIVE_COLOR = '#ffd055',
  DEFAULT_HOVER_COLOR = '#ffebb7',
}

interface StarRatingProps {
  size?: number;
  count?: number;
  activeColor?: DEFAULT_COLORS | string;
  hoverColor?: DEFAULT_COLORS | string;
  innerRadius?: number;
  outerRadius?: number;
  isHalfRating?: boolean;
  handleOnClick?: (rating: number) => void;
  roundedCorner?: boolean;
  isReadOnly?: boolean;
  initialRating?: number;
  starClassName?: string;
  containerClassName?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
                                                 size = 30,
                                                 count = 5,
                                                 innerRadius = 25,
                                                 outerRadius = 50,
                                                 activeColor = DEFAULT_COLORS.DEFAULT_ACTIVE_COLOR,
                                                 hoverColor = DEFAULT_COLORS.DEFAULT_HOVER_COLOR,
                                                 isHalfRating = false,
                                                 roundedCorner = true,
                                                 handleOnClick = () => {},
                                                 isReadOnly = false,
                                                 initialRating = 0,
                                                 starClassName = '',
                                                 containerClassName = ''
                                               }) => {

  const [currentRating, setCurrentRating] = useState<number>(0);
  const [currentHoverStarIndex, setCurrentHoverStarIndex] = useState<number>(-1);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedStarIndex, setSelectedStarIndex] = useState<number>(-1);
  const [isLeftSideHover, setIsLeftSideHover] = useState<boolean>(false);

  useEffect(() => {
    if (initialRating !== 0) {
      setSelectedRating(initialRating);
      const defaultIndex = initialRating % 1 === 0
          ? initialRating - 1
          : Math.floor(initialRating);
      setSelectedStarIndex(defaultIndex);
    }
  }, []);

  const handleStarMouseMove = useCallback((offsetX: number, index) => {
    if (isReadOnly) {
      return;
    }

    if (isHalfRating) {
      const isLeftSide = offsetX < Math.floor(size / 2);
      setIsLeftSideHover(isLeftSide);
      setCurrentRating(isLeftSide ? index + 0.5 : index + 1);
    } else {
      setCurrentRating(index + 1);
    }
    setCurrentHoverStarIndex(index);
  }, [currentRating, currentHoverStarIndex]);

  const handleMouseOut = useCallback(() => {
    if (isReadOnly) {
      return;
    }

    setCurrentHoverStarIndex(-1);
  }, [currentHoverStarIndex]);

  const handleStarClick = useCallback((index: number) => {
    if (isReadOnly) {
      return;
    }

    handleOnClick(currentRating);
    setSelectedRating(currentRating);
    setSelectedStarIndex(index);
  }, [currentRating]);

  const getLeftColor = (index: number): DEFAULT_COLORS | string => {
    if (index <= selectedStarIndex && index <= currentHoverStarIndex) {
      return hoverColor;
    } else if (index >= selectedStarIndex && index <= currentHoverStarIndex) {
      return activeColor;
    } else if (index <= currentHoverStarIndex) {
      return hoverColor;
    } else if (index <= selectedStarIndex) {
      return activeColor;
    }

    return DEFAULT_COLORS.DEFAULT_COLOR;
  };

  const getRightColor = (index: number): DEFAULT_COLORS | string => {
    const isHover = currentHoverStarIndex === index;
    const isSelected = selectedStarIndex === index;

    if (isHalfRating) {
      if (isHover) {
        return getHoverRightColor(index);
      } else if (isSelected) {
        return getSelectedRightColor(index);
      } else {
        return getLeftColor(index);
      }
    }

    return getLeftColor(index);
  };

  const getHoverRightColor = (index: number): DEFAULT_COLORS | string => {
    const isHalfSelectedHover = selectedRating % 1 === 0.5 && selectedStarIndex === index;

    if (isLeftSideHover) {
      if (!isHalfSelectedHover && index > selectedRating) {
        return activeColor;
      }

      return DEFAULT_COLORS.DEFAULT_COLOR;
    }

    return isHalfSelectedHover
        ? activeColor
        : getLeftColor(index);
  };

  const getSelectedRightColor = (index: number): DEFAULT_COLORS | string => {
    const isHalfSelected = selectedRating % 1 === 0.5;

    if (selectedStarIndex < currentHoverStarIndex && isHalfSelected) {
      return activeColor;
    } else if (isHalfSelected) {
      return DEFAULT_COLORS.DEFAULT_COLOR;
    }

    return getLeftColor(index);
  };

  return (
    <div className={containerClassName}>
      {Array.from({length: count}, (v, i) =>
        <Star
          key={i}
          index={i}
          size={size}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          leftColor={getLeftColor(i)}
          rightColor={getRightColor(i)}
          handleStarMouseMove={handleStarMouseMove}
          handleMouseOut={handleMouseOut}
          handleStarClick={handleStarClick}
          strokeLinejoin={roundedCorner ? 'round' : 'miter'}
          strokeLinecap={roundedCorner ? 'round' : 'butt'}
          className={starClassName}
        />
      )}
    </div>
  );
};

export default memo(StarRating);