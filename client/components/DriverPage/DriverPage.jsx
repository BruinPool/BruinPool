import React, { Component } from 'react';
import style from './DriverPage.css';
import Header from '../Header/Header';
import PostModule from '../PostModule/PostModule';
import RideHistory from '../RideHistory/RideHistory';
import RideHistoryEntry from '../RideHistoryEntry/RideHistoryEntry';
import UpcomingFeed from '../UpcomingFeed/UpcomingFeed';
import UpcomingFeedEntry from '../UpcomingFeedEntry/UpcomingFeedEntry';
import { feed, upcoming } from '../mockData';

const axios = require('axios');

class DriverPage extends Component {
  constructor () {
    super();
    this.state = {
      rideHistory: feed,
      upcomingRide: upcoming,
    }

    this.fetchRideHistory = this.fetchRideHistory.bind(this);
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


  render () {
    const { rideHistory, upcomingRide } = this.state;
    const { userInfo, logout, changePage, curPage } = this.props;

    return (
      <div className={style.DriverPage}>
        <PostModule userInfo={userInfo} />
        <RideHistory userInfo={userInfo} rideHistory={rideHistory} />
        <UpcomingFeed userInfo={userInfo} upcomingRide={upcomingRide} />
      </div>
    );
  }
}

export default DriverPage;
