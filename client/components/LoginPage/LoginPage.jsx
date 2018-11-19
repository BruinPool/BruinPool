import React from 'react';
import style from './LoginPage.css';
import SignupModule from '../SignupModule/SignupModule';
import LoginModule from '../LoginModule/LoginModule';
import LoginPageHeader from '../LoginPageHeader/LoginPageHeader';

const LoginPage = ({ login }) => {
  return (
    <div className={style.main}>
      <div className={style.imgContainer}>
        <img alt="mainLogo" src="https://s3-us-west-1.amazonaws.com/bruinpoolprofilepics/bucketFolder/Beta+TRANSPARENT.png" className={style.coverImg} />
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
