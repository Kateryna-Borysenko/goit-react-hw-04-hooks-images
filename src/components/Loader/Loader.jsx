import React from 'react';
import Loader from 'react-loader-spinner';
import s from './Loader.module.css';

const Spiner = () => {
  return (
    <div>
      <Loader
        className={s.spinner}
        type="ThreeDots"
        color="#fff"
        height={100}
        width={100}
      />
    </div>
  );
};
export default Spiner;
