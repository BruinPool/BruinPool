import React, { Component } from 'react';
import style from './LoginPage.css';
import SignupModule from '../SignupModule/SignupModule';
import LoginModule from '../LoginModule/LoginModule';
import LoginPageHeader from '../LoginPageHeader/LoginPageHeader';

const axios = require('axios');

class LoginPage extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className={style.main}>
        <div className={style.imgContainer}>
          <img src="https://png.pngtree.com/element_origin_min_pic/16/10/02/1557f0b6a826a07.jpg" className={style.coverImg} />
          Got Ride?
        </div>
        <div className={style.modulesContainer}>
          <LoginModule login={this.props.login} />
          <SignupModule login={this.props.login} />
        </div>
        <LoginPageHeader />
      </div>
    )
  }
}

export default LoginPage;