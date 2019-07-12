import React, {useState, useEffect, SyntheticEvent} from 'react';
import { uniqueId } from 'lodash';
import classNames from 'classnames';
import styles from './Star.scss';
interface StarProps {
  index: number;
  size: number;
  leftColor: string;
  rightColor: string;
  innerRadius: number;
  outerRadius: number;
  handleStarMouseMove: (e: number, index: number) => void;
  handleMouseOut: () => void;
  handleStarClick: () => void;
  strokeLinejoin: "miter" | "round";
  strokeLinecap: "butt" | "round";
  className?: string;
}

const NUM_POINT = 5;
const STROKE_WIDTH = 10;
const Star: React.FC<StarProps> = ({
                                     index,
                                     size,
                                     leftColor,
                                     rightColor,
                                     innerRadius,
                                     outerRadius,
                                     handleStarMouseMove,
                                     handleMouseOut,
                                     handleStarClick,
                                     strokeLinejoin,
                                     strokeLinecap,
                                     className = ''
                                   }) => {
  const [id, setId] = useState<string>('');

  useEffect(() => {
    setId(uniqueId())
  }, []);

  const center = Math.max(innerRadius, outerRadius);
  const angle = Math.PI / NUM_POINT;
  const points = [];

  for (let i = 0; i < NUM_POINT * 2; i++) {
    let radius = i % 2 === 0 ? outerRadius : innerRadius;
    points.push(center + radius * Math.sin(i * angle) + STROKE_WIDTH);
    points.push(center - radius * Math.cos(i * angle) + STROKE_WIDTH);
  }

  const handleMouseMove = (e: SyntheticEvent<SVGElement, MouseEvent>, index: number) => {
    handleStarMouseMove(e.nativeEvent.offsetX, index);
  };

  return (
    <svg
      className={classNames(styles.star, className)}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 120 120`}
      onMouseMove={(e) => handleMouseMove(e, index)}
      onMouseOut={handleMouseOut}
      onClick={handleStarClick}
    >
      <defs>
        <linearGradient id={id} x1="0" x2="100%" y1="0" y2="0">
          <stop offset="0%" stopColor={leftColor}/>
          <stop offset="50%" stopColor={leftColor}/>
          <stop offset="50%" stopColor={rightColor}/>
        </linearGradient>
      </defs>
      <path
        d={`M${points.toString()}Z`}
        fill={`url(#${id})`}
        stroke={`url(#${id})`}
        strokeWidth={STROKE_WIDTH}
        strokeLinejoin={strokeLinejoin}
        strokeLinecap={strokeLinecap}
      />
    </svg>
  );
};

export default Star;