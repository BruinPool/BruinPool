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
      upcomingRide: upcoming,
      curTab: 'upcoming',
    };

    this.fetchRideHistory = this.fetchRideHistory.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount () {
    const { userInfo } = this.props;

    // this.fetchRideHistory(userInfo.username);
  }

  fetchRideHistory (username) {
    axios.get('/rideList', {
      params: {
        username,
      },
    })
      .then((response) => {
        this.setState({
          rideHistory: response.data,
          upcomingRide: response.data.slice(0, 1),
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onClick (e) {
    this.setState({ curTab: e.target.id });
  }


  render () {
    const { driveHistory, rideHistory, upcomingRide, curTab } = this.state;
    const { userInfo, logout, changePage, curPage } = this.props;

    return (
      <div className={style.MyAccount}>
        <div className={style.userInfo}>
          <div className={style.profilePic}>
          </div>
          <div className={style.infoContainer}>
            <div className={style.username}>
              {userInfo.username}
            </div>
            <div className={style.margin} />
            <div className={style.driveHistory}>
              {`${driveHistory.length} rides contributed`}
            </div>
            <div className={style.margin} />
            <div className={style.rideHistory}>
              {`${rideHistory.length} rides taken`}
            </div>
            <div className={style.margin} />
            <div className={style.email}>
              {userInfo.email}
            </div>
          </div>
        </div>
        <div className={style.indicator}>
          <div className={style[curTab === 'upcoming' || 'off']}>
            <div id="upcoming" className={style.btnWrapper} onClick={this.onClick}>
              Upcoming
            </div>
          </div>
          <div className={style[curTab === 'rides' || 'off']}>
            <div id="rides" className={style.btnWrapper} onClick={this.onClick}>
              Rides
            </div>
          </div>
          <div className={style[curTab === 'drives' || 'off']}>
            <div id="drives" className={style.btnWrapper} onClick={this.onClick}>
              Drives
            </div>
          </div>
        </div>
        {curTab === 'upcoming' && <MyAccountFeed feed={upcomingRide} />}
        {curTab === 'rides' && <MyAccountFeed feed={rideHistory} />}
        {curTab === 'drives' && <MyAccountFeed feed={driveHistory} />}
      </div>
    );
  }
}

export default MyAccount;
