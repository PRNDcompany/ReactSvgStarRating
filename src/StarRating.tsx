import React, {useState, useCallback, useEffect} from 'react';
import Star from './Star';

interface StarRatingProps {
  size?: number;
  count?: number;
  activeColor?: string;
  hoverColor?: string;
  innerRadius?: number;
  outerRadius?: number;
  isHalfRating?: boolean;
  handleOnClick?: (rating: number) => void;
  roundedCorner?: boolean;
  isReadOnly?: boolean;
  initialRating?: number;
  className?: string;
}

const DEFAULT_COLOR = '#ddd';
const DEFAULT_ACTIVE_COLOR = '#ffd055';
const DEFAULT_HOVER_COLOR = '#ffebb7';
const StarRating: React.FC<StarRatingProps> = ({
                                                 size = 30,
                                                 count = 5,
                                                 innerRadius = 25,
                                                 outerRadius = 50,
                                                 activeColor = DEFAULT_ACTIVE_COLOR,
                                                 hoverColor = DEFAULT_HOVER_COLOR,
                                                 isHalfRating = false,
                                                 roundedCorner = true,
                                                 handleOnClick = () => {},
                                                 isReadOnly = false,
                                                 initialRating = 0,
                                                 className,
                                               }) => {

  const [currentRating, setCurrentRating] = useState<number>(0);
  const [currentHoverStarIndex, setCurrentHoverStarIndex] = useState<number>(-1);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedStarIndex, setSelectedStarIndex] = useState<number>(-1);
  const [isLeftSideHover, setIsLeftSideHover] = useState<boolean>(false);

  useEffect(() => {
    if(initialRating !== 0) {
      setSelectedRating(initialRating);
      const defaultIndex = initialRating % 1 === 0 ? initialRating - 1 : Math.floor(initialRating);
      setSelectedStarIndex(defaultIndex);
    }
  }, []);

  const handleStarMouseMove = useCallback((offsetX: number, index) => {
    if(isReadOnly)
      return;

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
    if(isReadOnly)
      return;

    setCurrentHoverStarIndex(-1);
  }, [currentHoverStarIndex]);

  const handleStarClick = useCallback((index: number) => {
    if(isReadOnly)
      return;

    handleOnClick(currentRating);
    setSelectedRating(currentRating);
    setSelectedStarIndex(index);
  }, [currentRating]);

  const getLeftColor = (index: number) => {
    if (index <= selectedStarIndex && index <= currentHoverStarIndex) {
      return hoverColor;
    } else if (index >= selectedStarIndex && index <= currentHoverStarIndex) {
      return activeColor;
    } else if (index <= currentHoverStarIndex) {
      return hoverColor;
    } else if (index <= selectedStarIndex) {
      return activeColor;
    } else {
      return DEFAULT_COLOR;
    }
  };

  const getRightColor = (index: number) => {
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
    } else {
      return getLeftColor(index);
    }
  };

  const getHoverRightColor = (index: number) => {
    const isHalfSelectedHover = selectedRating % 1 === 0.5 && selectedStarIndex === index;
    if (isLeftSideHover) {
      return isHalfSelectedHover ? DEFAULT_COLOR : index <= selectedStarIndex ? activeColor : DEFAULT_COLOR;
    } else {
      return isHalfSelectedHover ? activeColor : getLeftColor(index);
    }
  };

  const getSelectedRightColor = (index: number) => {
    const isHalfSelected = selectedRating % 1 === 0.5;
    if (selectedStarIndex < currentHoverStarIndex && isHalfSelected) {
      return activeColor;
    } else if (isHalfSelected) {
      return DEFAULT_COLOR;
    } else {
      return getLeftColor(index);
    }
  };

  return (
    <div>
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
          handleStarClick={() => handleStarClick(i)}
          strokeLinejoin={roundedCorner ? 'round' : 'miter'}
          strokeLinecap={roundedCorner ? 'round' : 'butt'}
          className={className}
        />)
      }
    </div>
  );
};

export default StarRating;