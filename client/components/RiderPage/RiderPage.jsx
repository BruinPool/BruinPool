import React, { Component } from 'react';
import style from './RiderPage.css';
import FilterModule from '../FilterModule/FilterModule';
import FeedModule from '../FeedModule/FeedModule';
import UpcomingFeed from '../UpcomingFeed/UpcomingFeed';
import Header from '../Header/Header';

class RiderPage extends Component {
  constructor () {
    super();
    this.state = {
      curPage: 'rider',
    };
  }

  componentWillMount () {
    const { fetchRideUpcoming } = this.props;
    fetchRideUpcoming();
  }

  render () {
    const { curPage } = this.state;
    const { userInfo, filter, driveCancel, logout, fetchRideFeed, fetchProfilePic, fetchRideUpcoming, fetchMoreRideFeed, join, toggleEditModal, toggleInfoModal, cancel, upcomingRide, rideFeed, newNoti, oldNoti, clearNotification } = this.props;
    return (
      <div className={style.RiderPage}>
        <Header userInfo={userInfo} logout={logout} curPage={curPage} newNoti={newNoti} oldNoti={oldNoti} clearNotification={clearNotification} />
        <UpcomingFeed fetchProfilePic={fetchProfilePic} userInfo={userInfo} join={join} fetchRideFeed={fetchRideFeed} fetchRideUpcoming={fetchRideUpcoming} upcomingRide={upcomingRide} rideCancel={cancel} type="ride" toggleInfoModal={toggleInfoModal} />
        <FilterModule fetchRideFeed={fetchRideFeed} />
        <FeedModule fetchProfilePic={fetchProfilePic} filter={filter} driveCancel={driveCancel} userInfo={userInfo} join={join} rideFeed={rideFeed} fetchMoreRideFeed={fetchMoreRideFeed} fetchRideFeed={fetchRideFeed} fetchRideUpcoming={fetchRideUpcoming} cancel={cancel} toggleInfoModal={toggleInfoModal} toggleEditModal={toggleEditModal} />
      </div>
    );
  }
}

export default RiderPage;
