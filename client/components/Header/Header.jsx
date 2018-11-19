import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './Header.css';
import HeaderDownMenu from '../HeaderDownMenu/HeaderDownMenu';
import Notification from '../Notification/Notification';

class Header extends Component {
  constructor () {
    super();
    this.state = {
      dropDown: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick () {
    const { dropDown } = this.state;
    const { clearNotification } = this.props;
    this.setState({ dropDown: !dropDown });
    clearNotification();
  }

  render () {
    const { dropDown } = this.state;
    const { userInfo, curPage, newNoti, oldNoti } = this.props;
    const isNoti = newNoti.length;

    return (
      <header className={style.header} style={curPage === 'rider' ? ({ backgroundColor: '#8cd2ff' }) : ({ backgroundColor: '#f7b400' })}>
        <div className={style.topDivider} />
        <Link to="/rider" className={style.logo}>
          BruinPool
        </Link>
        <button className={style.notiBtnDesktopBox} style={curPage === 'rider' ? ({ backgroundColor: '#8cd2ff' }) : ({ backgroundColor: '#f7b400' })} type="button" onClick={this.onClick}>
          {isNoti ? (
            <img className={style.notiBtnDesktop} src="https://s3-us-west-1.amazonaws.com/bruinpoolprofilepics/bucketFolder/Bell+Icon+with+Dot.png" />
          ) : (
            <img className={style.notiBtnDesktop} src="https://s3-us-west-1.amazonaws.com/bruinpoolprofilepics/bucketFolder/Bell+Icon.png" />
          )}
        </button>
        {dropDown && <Notification dropDown={dropDown} newNoti={newNoti} oldNoti={oldNoti} />}
        <Link to="/myaccount" className={style.userBtn}>
          <div className={style.username}>
            {userInfo.username}
          </div>
          <div className={style.profilePicBox}>
            <img className={style.profilePic} alt="userPic" src={userInfo.picUrl} />
          </div>
        </Link>
        <div className={style.botDivider} />
        <HeaderDownMenu userInfo={userInfo} curPage={curPage} />
      </header>
    ); 
  }
};

export default Header;
