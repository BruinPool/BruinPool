import React, { Component } from 'react';
import style from './MyAccount.css';
import MyAccountFeed from '../MyAccountFeed/MyAccountFeed';
import Header from '../Header/Header';

const axios = require('axios');

class MyAccount extends Component {
  constructor () {
    super();
    this.state = {
      rideHistoryPage: 0,
      driveHistoryPage: 0,
      totalDriveHistory: 0,
      totalRideHistory: 0,
      driveHistory: [],
      rideHistory: [],
      curPage: 'myaccount',
      curTab: 'rideHistory',
      file: null,
    };

    this.fetch = this.fetch.bind(this);
    this.onClick = this.onClick.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.submitFile = this.submitFile.bind(this);
    this.fetchHistoryTotal = this.fetchHistoryTotal.bind(this);
  }

  componentDidMount () {
    this.fetch('rideHistory');
    this.fetch('driveHistory');
    this.fetchHistoryTotal();
  }

  onClick (e) {
    this.setState({ curTab: e.target.id });
  }

  fetchHistoryTotal () {
    const { userInfo } = this.props;

    axios.get('/rideList', {
      params: {
        userInfo,
        type: 'fetchHistoryTotal',
      }
    })
      .then ((res) => {
        this.setState({
          totalRideHistory: res.data[0],
          totalDriveHistory: res.data[1],
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  fetch (type) {
    const { userInfo } = this.props;
    const { rideHistoryPage, driveHistoryPage, driveHistory, rideHistory } = this.state;
    console.log(type, driveHistory, driveHistoryPage)
    if (type === 'rideHistory') {
      axios.get('/rideList', {
        params: {
          pageNum: rideHistoryPage,
          userInfo,
          type: 'rideHistoryMyAccount',
        },
      })
        .then((res) => {
          this.setState({
            rideHistory: rideHistory.concat(res.data),
            rideHistoryPage: rideHistoryPage + 1,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
    if (type === 'driveHistory') {
      axios.get('/rideList', {
        params: {
          pageNum: driveHistoryPage,
          userInfo,
          type: 'driveHistoryMyAccount',
        },
      })
        .then((res) => {
          console.log(res.data)
          this.setState({
            driveHistory: driveHistory.concat(res.data),
            driveHistoryPage: driveHistoryPage + 1,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  logoutHandler () {
    const { logout } = this.props;
    logout();
  }

  submitFile () {
    const { file } = this.state;
    if (file[0].size > 2200000) {
      alert('File too big!');
      return;
    } else {
      const { userInfo, cookieAuth } = this.props;
      const formData = new FormData();

      formData.append('file', file[0]);
      axios.post('/upload-profile-pic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'userId' : userInfo._id,
        },
      }).then(response => {
        cookieAuth();
      }).catch(error => {
        console.error(error);
      });
    }
  }

  handleUpload (e) {
    this.setState({ file: e.target.files }, this.submitFile);
  }

  render () {
    const { driveHistory, rideHistory, curTab, curPage, totalDriveHistory, totalRideHistory, rideHistoryPage, driveHistoryPage } = this.state;
    const { userInfo, logout, newNoti, oldNoti, clearNotification } = this.props;
    const browserWidth = window.innerWidth;
    console.log(driveHistoryPage, rideHistoryPage)
    return (
      <div className={style.MyAccount}>
        <Header userInfo={userInfo} logout={logout} curPage={curPage} newNoti={newNoti} oldNoti={oldNoti} clearNotification={clearNotification} />
        <div className={style.userInfo}>
          <div className={style.profilePicBox}>
            <img className={style.profilePic} src={userInfo.picUrl} alt="Smiley face" />
            <input className={style.uploadBtn} type="file" onChange={this.handleUpload} />
            <div className={style.hoverLogoBox}>
              <div className={style.hoverLogo}>
                <i className="fas fa-camera" style={{ display: 'inline-block' }} />
                update
              </div>
            </div>
          </div>
          <div className={style.infoContainer}>
            <div className={style.username}>
              {userInfo.username}
            </div>
            <div className={style.margin} />
            <div className={style.driveHistory}>
              {`${totalDriveHistory} drives`}
            </div>
            <div className={style.margin} />
            <div className={style.rideHistory}>
              {`${totalRideHistory} rides`}
            </div>
            <div className={style.margin} />
            <div className={style.email}>
              {userInfo.email}
            </div>
            <button className={style.signOutBtn} type="button" onClick={this.logoutHandler}>
              Sign out
            </button>
          </div>
        </div>
        <div className={style.indicator}>
          <div className={style[curTab === 'rideHistory' || 'off']}>
            {browserWidth > 480 ? (
              <button id="rideHistory" className={style.rideBtnWrapper} onClick={this.onClick}>
                Rides
              </button>
            ) : (
              <input id="rideHistory" className={style.mobileBtnImg} type="image" src="https://s3-us-west-1.amazonaws.com/bruinpoolprofilepics/bucketFolder/Passenger+Transparent.png" onClick={this.onClick} />
            )}
          </div>
          <div className={style[curTab === 'driveHistory' || 'off']} >
            {browserWidth > 480 ? (
              <button id="driveHistory" className={style.driveBtnWrapper} onClick={this.onClick}>
                Drives
              </button>
            ) : (
              <input id="driveHistory" className={style.mobileBtnImg} type="image" src="https://s3-us-west-1.amazonaws.com/bruinpoolprofilepics/bucketFolder/Driver+Transparent.png" onClick={this.onClick}/>
            )}
          </div>
        </div>
        {curTab === 'rideHistory' && <MyAccountFeed feed={rideHistory} userInfo={userInfo} type="rideHistory" rideHistoryPage={rideHistoryPage} fetch={this.fetch} />}
        {curTab === 'driveHistory' && <MyAccountFeed feed={driveHistory} userInfo={userInfo} type="driveHistory" driveHistoryPage={driveHistoryPage} fetch={this.fetch} />}
      </div>
    );
  }
}

export default MyAccount;
