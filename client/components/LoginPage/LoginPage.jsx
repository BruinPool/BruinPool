import React from 'react';
import style from './LoginPage.css';
import SignupModule from '../SignupModule/SignupModule';
import LoginModule from '../LoginModule/LoginModule';
import LoginPageHeader from '../LoginPageHeader/LoginPageHeader';

const LoginPage = ({ login }) => {
  return (
    <div className={style.main}>
      <div className={style.imgContainer}>
        <img alt="mainLogo" src="https://png.pngtree.com/element_origin_min_pic/16/10/02/1557f0b6a826a07.jpg" className={style.coverImg} />
        Got Ride?
      </div>
      <div className={style.modulesContainer}>
        <LoginModule login={login} />
        <SignupModule login={login} />
      </div>
      <LoginPageHeader />
    </div>
  );
};

export default LoginPage;
