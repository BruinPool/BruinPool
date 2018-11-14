import React, { Component } from 'react';
import style from './DriverPage.css';
import PostModule from '../PostModule/PostModule';
import RideHistory from '../RideHistory/RideHistory';
import UpcomingFeed from '../UpcomingFeed/UpcomingFeed';
import EmptyPage from '../EmptyPage/EmptyPage';
import { feed, upcoming } from '../mockData';

const axios = require('axios');

class DriverPage extends Component {
  constructor () {
    super();
    this.state = {
      rideHistory: [],
      upcomingRide: [],
    };

    this.fetch = this.fetch.bind(this);
    this.fetchUpcoming = this.fetchUpcoming.bind(this);
    this.post = this.post.bind(this);
  }

  componentWillMount () {
    this.fetch();
    this.fetchUpcoming();
  }

  fetch () {
    const { userInfo } = this.props;

    axios.get('/rideList', {
      params: {
        userInfo,
        type: 'driveHistory',
      },
    })
      .then((res) => {
        this.setState({
          rideHistory: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  fetchUpcoming () {
    const { userInfo } = this.props;

    axios.get('/rideList', {
      params: {
        userInfo,
        type: 'driveUpcoming',
      },
    })
      .then((res) => {
        this.setState({
          upcomingRide: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  post (info) {
    const { userInfo } = this.props;

    const rideInfo = {
      ownerEmail: userInfo.email,
      ownerUsername: userInfo.username,
      ownerPhoneNumber: userInfo.phoneNumber,
      from: info.from,
      to: info.to,
      date: info.date,
      seats: 4,
      price: info.price,
      detail: info.detail,
      passengers: [],
    };

    axios.post('/rideList', {
      rideInfo,
    })
      .then((response) => {
        alert('posted!');
      })
      .catch((error) => {
        console.error(error);
      });
  }


  render () {
    const { rideHistory, upcomingRide } = this.state;
    const { userInfo, logout, changePage, curPage, driveCancel } = this.props;

    return (
      <div className={style.DriverPage}>
        <UpcomingFeed userInfo={userInfo} upcomingRide={upcomingRide} driveCancel={driveCancel} type="drive" />
        <PostModule userInfo={userInfo} post={this.post} />
        {rideHistory.length !== 0 ? (
          <RideHistory userInfo={userInfo} rideHistory={rideHistory} cancel={this.cancel} />
        ) : (
          <EmptyPage page="driver" />
        )}
      </div>
    );
  }
}

export default DriverPage;
