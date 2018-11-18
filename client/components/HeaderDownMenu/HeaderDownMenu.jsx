import React from 'react';
import { Link } from 'react-router-dom';
import style from './HeaderDownMenu.css';

const HeaderDownMenu = ({ curPage }) => {
  return (
    <div className={style.HeaderDownMenu}>
      <div className={style.btns}>
        <div className={style.btnContainer}>
          <Link to="/rider" className={curPage === 'rider' ? (style.riderbtnOn) : (style.riderbtnOff)} name="rider">
            Rider
          </Link>
        </div>
        <div className={style.btnContainer}>
          <Link to="/driver" className={curPage === 'driver' ? (style.driverbtnOn) : (style.driverbtnOff)} name="driver">
            Driver
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderDownMenu;
