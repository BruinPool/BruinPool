import React, { Component } from 'react';
import style from './DriverPage.css';
import PostModule from '../PostModule/PostModule';
import RideHistory from '../RideHistory/RideHistory';
import UpcomingFeed from '../UpcomingFeed/UpcomingFeed';
import EmptyPage from '../EmptyPage/EmptyPage';
import Header from '../Header/Header';

class DriverPage extends Component {
  constructor () {
    super();
    this.state = {
      curPage: 'driver',
    };
  }

  componentWillMount () {
    const { fetchDriveUpcoming, fetchDriveHistory } = this.props;
    fetchDriveUpcoming();
    fetchDriveHistory();
  }

  render () {
    const { curPage } = this.state;
    const { userInfo, logout, fetchMoreDriveHistory, fetchProfilePic, fetchDriveHistory, fetchDriveUpcoming, newNoti, oldNoti, clearNotification, post, join, driveCancel, toggleInfoModal, toggleEditModal, driveHistory, upcomingDrive } = this.props;

    return (
      <div className={style.DriverPage}>
        <Header userInfo={userInfo} logout={logout} curPage={curPage} newNoti={newNoti} oldNoti={oldNoti} clearNotification={clearNotification} />
        <UpcomingFeed fetchProfilePic={fetchProfilePic} userInfo={userInfo} join={join} fetchDriveHistory={fetchDriveHistory} fetchDriveUpcoming={fetchDriveUpcoming} upcomingRide={upcomingDrive} driveCancel={driveCancel} type="drive" toggleInfoModal={toggleInfoModal} toggleEditModal={toggleEditModal} />
        <PostModule userInfo={userInfo} post={post} entry={false} fetchDriveHistory={fetchDriveHistory} fetchDriveUpcoming={fetchDriveUpcoming} />
        {driveHistory.length !== 0 ? (
          <RideHistory fetchProfilePic={fetchProfilePic} userInfo={userInfo} driveHistory={driveHistory} cancel={this.cancel} fetchMoreDriveHistory={fetchMoreDriveHistory} />
        ) : (
          <EmptyPage page="driver" />
        )}
      </div>
    );
  }
}

export default DriverPage;
