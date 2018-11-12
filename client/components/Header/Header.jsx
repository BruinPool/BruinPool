import React, { Component } from 'react';
import style from './Header.css';
import HeaderDownMenu from '../HeaderDownMenu/HeaderDownMenu';

class Header extends Component {
  constructor () {
    super()

    this.onClick = this.onClick.bind(this);
  }

  onClick () {
    const { changePage } = this.props;

    changePage('myaccount');
  }

  render () {
    const { userInfo, curPage, changePage } = this.props;

    return (
      <header className={style.header}>
        <div className={style.topDivider} />
        <div className={style.logo}>
          BruinPool
        </div>
        <div className={style.userBtn} onClick={this.onClick}>
          <div className={style.username}>
            {userInfo.username}
          </div>
          <div className={style.profilePic}>
            <i className="fas fa-user-circle" />
          </div>
        </div>
        <div className={style.botDivider} />
        <HeaderDownMenu userInfo={userInfo} changePage={changePage} curPage={curPage} />
      </header>
    );
  }
}

export default Header;
