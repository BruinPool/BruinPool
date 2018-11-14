import React, { Component } from 'react';
import style from './MyAccount.css';
import MyAccountFeed from '../MyAccountFeed/MyAccountFeed';
import { feed, upcoming } from '../mockData';

const axios = require('axios');

class MyAccount extends Component {
  constructor () {
    super();
    this.state = {
      driveHistory: feed,
      rideHistory: feed,
      curTab: 'rideHistory',
    };

    this.fetch = this.fetch.bind(this);
    this.onClick = this.onClick.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  componentDidMount () {
    this.fetch('rideHistory');
  }

  onClick (e) {
    this.setState({ curTab: e.target.id });
    this.fetch(e.target.id);
  }

  fetch (type) {
    const { userInfo } = this.props;

    axios.get('/rideList', {
      params: {
        userInfo,
        type,
      },
    })
      .then((res) => {
        this.setState({
          [type]: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  logoutHandler () {
    const { logout } = this.props;
    logout();
  }

  render () {
    const { driveHistory, rideHistory, curTab } = this.state;
    const { userInfo } = this.props;
    const browserWidth = window.innerWidth;

    return (
      <div className={style.MyAccount}>
        <div className={style.userInfo}>
          <div className={style.profilePic} />
          <div className={style.infoContainer}>
            <div className={style.username}>
              {userInfo.username}
            </div>
            <div className={style.margin} />
            <div className={style.driveHistory}>
              {`${driveHistory.length} drives`}
            </div>
            <div className={style.margin} />
            <div className={style.rideHistory}>
              {`${rideHistory.length} rides`}
            </div>
            <div className={style.margin} />
            <div className={style.email}>
              {userInfo.email}
            </div>
            <button onClick={this.logoutHandler}>
              logout
            </button>
          </div>
        </div>
        <div className={style.indicator}>
          <div className={style[curTab === 'rideHistory' || 'off']}>
            <div id="rideHistory" className={style.btnWrapper} onClick={this.onClick}>
              {browserWidth > 480 ? (
                'Rides'
              ) : (
                <i className="fas fa-user-alt" />
              )}
            </div>
          </div>
          <div className={style[curTab === 'driveHistory' || 'off']}>
            <div id="driveHistory" className={style.btnWrapper} onClick={this.onClick}>
              {browserWidth > 480 ? (
                'Drives'
              ) : (
                <i className="fas fa-car-side" />
              )}
            </div>
          </div>
        </div>
        {curTab === 'rideHistory' && <MyAccountFeed feed={rideHistory} userInfo={userInfo} />}
        {curTab === 'driveHistory' && <MyAccountFeed feed={driveHistory} userInfo={userInfo} />}
      </div>
    );
  }
}

export default MyAccount;
