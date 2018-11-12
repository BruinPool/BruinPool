import React, { Component } from 'react';
import style from './LoginPageHeader.css';

class LoginPageHeader extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <header className={style.Header}>
        BruinPool
      </header>
    );
  }
}

export default LoginPageHeader;