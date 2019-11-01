import React from 'react';
import ReactDOM from 'react-dom';
import StarRating from './StarRating';
import styles from './index.dev.scss';

const App = () => {

  const handleOnClick = (rating: number) => {
    console.log(rating);
  };

  return (
    <>
      <StarRating
        handleOnClick={handleOnClick}
        isHalfRating={true}
        isReadOnly={true}
        initialRating={4.5}
        starClassName={styles.customStar}
      />
      <StarRating
        handleOnClick={handleOnClick}
        isHalfRating={true}
      />
    </>
  )
};

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
