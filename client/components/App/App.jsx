import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Route, Link, Redirect, BrowserRouter as Router } from 'react-router-dom';
import style from './App.css';
import LoginPage from '../LoginPage/LoginPage';
import DriverPage from '../DriverPage/DriverPage';
import RiderPage from '../RiderPage/RiderPage';
import MyAccount from '../MyAccount/MyAccount';
import EditModal from '../EditModal/EditModal';
import InfoModal from '../InfoModal/InfoModal';
import Notification from '../Notification/Notification';


const axios = require('axios');

class App extends Component {

  constructor() {
    super();

    this.state = {
      authToken: '',
      userInfo: false,
      editModal: false,
      infoModal: false,
      rideFeed: [],
      upcomingRide: [],
      driveHistory: [],
      upcomingDrive: [],
      riderPageNum: 1,
      driverPageNum: 1,
      filter: null,
      newNoti: [],
      oldNoti: [],
    };

    this.login = this.login.bind(this);
    this.cookieAuth = this.cookieAuth.bind(this);
    this.logout = this.logout.bind(this);
    this.driveCancel = this.driveCancel.bind(this);
    this.edit = this.edit.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.toggleInfoModal = this.toggleInfoModal.bind(this);
    this.cancel = this.cancel.bind(this);
    this.join = this.join.bind(this);
    this.fetchRideFeed = this.fetchRideFeed.bind(this);
    this.fetchMoreRideFeed = this.fetchMoreRideFeed.bind(this);
    this.fetchRideUpcoming = this.fetchRideUpcoming.bind(this);
    this.fetchDriveHistory = this.fetchDriveHistory.bind(this);
    this.fetchMoreDriveHistory = this.fetchMoreDriveHistory.bind(this);
    this.fetchDriveUpcoming = this.fetchDriveUpcoming.bind(this);
    this.post = this.post.bind(this);
    this.fetchNotification = this.fetchNotification.bind(this);
    this.clearNotification = this.clearNotification.bind(this);
    this.fetchProfilePic = this.fetchProfilePic.bind(this);
  }

  componentWillMount () {
    const cookies = new Cookies();
    const authToken = cookies.get('authToken');
    if (authToken) {
      this.setState({ authToken });
      this.cookieAuth(authToken);
      this.fetchNotification(authToken);
    }
  }

  componentDidMount () {
    this.fetchRideFeed(null);
  }

  cookieAuth (authToken) {
    authToken = authToken || this.state.authToken;
    axios.get('/login', {
      params: {
        authToken,
        type: 'cookie',
      },
    })
      .then((res) => {
        if (res.data.length !== 0) {
          this.setState({
            userInfo: res.data[0],
            editModal: false,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  login (email, password) {
    const cookies = new Cookies();

    axios.get('/login', {
      params: {
        email,
        password,
        type: 'login',
      },
    })
      .then((res) => {
        if (res.data.length === 0) {
          alert('Email or password is incorrect');
        } else {
          const authToken = {
            email: res.data.email,
            authToken: res.data.authToken,
          };
          cookies.set('authToken', authToken, { path: '/' });
          this.setState({ userInfo: res.data });
          this.fetchNotification(authToken);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  logout () {
    const cookies = new Cookies();

    cookies.remove('authToken');
    window.location.reload();
  }

  fetchNotification (authToken) {
    const notiDivider = (noti) => {
      const newNoti = [];
      const oldNoti = [];

      noti.forEach((item) => {
        if (item.viewed) {
          oldNoti.push(item);
        } else {
          newNoti.push(item);
        }
      });
      return [newNoti, oldNoti];
    };
    axios.get('/notification', {
      params: {
        authToken,
      },
    })
      .then((res) => {
        this.setState({
          newNoti: notiDivider(res.data)[0],
          oldNoti: notiDivider(res.data)[1],
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  clearNotification () {
    const { userInfo, authToken } = this.state;

    axios.put('/notification', {
      email: userInfo.email,
    })
      .then((res) => {
        return;
      })
      .catch((err) => {
        console.error(err);
      })
  }

  fetchProfilePic (username, cb) {
    axios.get('/usersPic', {
      params: {
        username,
      },
    })
      .then((res) => {
        console.log(res.data)
        cb(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  join (entry) {
    const { userInfo, authToken } = this.state;
    entry.passengers.push(userInfo.username);

    axios.put('/rideList', {
      entry,
      userInfo,
      status: 'join',
    })
      .then((response) => {
        alert('Joined!');
        this.cookieAuth(authToken);
        this.fetchRideFeed();
        this.fetchRideUpcoming();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  cancel (entry) {
    const { userInfo, authToken } = this.state;
    const ind = entry.passengers.indexOf(userInfo.username);
    entry.passengers.splice(ind, 1);

    axios.put('/rideList', {
      entry,
      userInfo,
      status: 'cancel',
    })
      .then((response) => {
        alert('Canceld!');
        this.cookieAuth(authToken);
        this.fetchRideFeed();
        this.fetchRideUpcoming();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  fetchRideFeed (filter) {
    const { rideFeed, riderPageNum } = this.state;
    this.setState({ filter });

    axios.get('/rideList', {
      params: {
        filter,
        pageNum: riderPageNum,
        type: 'rideFeed',
      },
    })
      .then((res) => {
        this.setState({
          rideFeed: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  fetchMoreRideFeed () {
    const { filter, riderPageNum, rideFeed } = this.state;

    axios.get('/rideList', {
      params: {
        filter,
        pageNum: riderPageNum,
        type: 'rideFeedMore',
      },
    })
      .then((res) => {
        this.setState({
          rideFeed: rideFeed.concat(res.data),
        });
      })
      .catch((err) => {
        console.error(err);
      });
    this.setState({ riderPageNum: riderPageNum + 1 });
  }

  fetchRideUpcoming () {
    const { userInfo } = this.state;
    axios.get('/rideList', {
      params: {
        userInfo,
        type: 'rideUpcoming',
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

  fetchDriveHistory () {
    const { userInfo, driverPageNum } = this.state;
    axios.get('/rideList', {
      params: {
        userInfo,
        pageNum: driverPageNum,
        type: 'driveHistory',
      },
    })
      .then((res) => {
        this.setState({
          driveHistory: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  fetchMoreDriveHistory () {
    const { userInfo, driveHistory, driverPageNum } = this.state;

    axios.get('/rideList', {
      params: {
        userInfo,
        pageNum: driverPageNum,
        type: 'driveHistoryMore',
      },
    })
      .then((res) => {
        this.setState({
          driveHistory: driveHistory.concat(res.data),
        });
      })
      .catch((err) => {
        console.error(err);
      });

    this.setState({ driverPageNum: driverPageNum + 1 });
  }

  fetchDriveUpcoming () {
    const { userInfo } = this.state;
    axios.get('/rideList', {
      params: {
        userInfo,
        type: 'driveUpcoming',
      },
    })
      .then((res) => {
        this.setState({
          upcomingDrive: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  post (info) {
    const { userInfo } = this.state;

    if (info.price > 1000) {
      alert('More than $1000 for a ride?...');
      return;
    }

    if (!info.seats || info.seats == 0) {
      alert('No seats?... why..');
      return;
    }

    if (info.seats > 10) {
      alert('Are you driving a bus?');
      return;
    }

    if (!info.from || !info.to) {
      alert('Please select destination');
      return;
    }

    const rideInfo = {
      ownerEmail: userInfo.email,
      ownerUsername: userInfo.username,
      ownerPhoneNumber: userInfo.phoneNumber,
      from: info.from,
      to: info.to,
      date: info.date,
      seats: info.seats,
      price: info.price,
      detail: info.detail,
      passengers: [],
    };

    axios.post('/rideList', {
      rideInfo,
    })
      .then(() => {
        alert('Posted!');
        this.fetchDriveUpcoming();
        this.fetchDriveHistory();
        this.fetchRideFeed();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  driveCancel (ride) {
    const { authToken } = this.state;
    axios.delete('/rideList', {
      params: {
        ride,
      },
    })
      .then((res) => {
        alert('Deleted!');
        this.cookieAuth(authToken);
        this.fetchDriveHistory();
        this.fetchDriveUpcoming();
        this.fetchRideFeed();
      })
      .catch((err) => {
        console.error(err);
      })
  }

  edit (entry) {
    const { editModal, authToken } = this.state;
    axios.put('/rideList', {
      entry,
    })
      .then((response) => {
        console.log(response.data)
        alert('Edited!');
        this.cookieAuth(authToken);
        this.toggleInfoModal(response.data);
        this.fetchDriveUpcoming();
        this.fetchDriveHistory();
        this.fetchRideFeed();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  toggleEditModal (entry) {
    this.setState({ editModal: entry });
    console.log('jey')
  }

  toggleInfoModal (entry) {
    this.setState({ infoModal: entry });
  }

  render () {
    const { userInfo, editModal, infoModal, rideFeed, upcomingRide, driveHistory, upcomingDrive, newNoti, oldNoti, filter } = this.state;

    return (
      <Router>
        <div className={style.main}>
          {userInfo ? (
            <Redirect to="/rider" />
          ) : (
            <Redirect to="loginPage" />
          )}
          {editModal && <EditModal fetchProfilePic={this.fetchProfilePic} entry={editModal} join={this.join} edit={this.edit} driveCancel={this.driveCancel} toggleEditModal={this.toggleEditModal} userInfo={userInfo} />}
          {infoModal && <InfoModal fetchProfilePic={this.fetchProfilePic} entry={infoModal} join={this.join} edit={this.edit} toggleInfoModal={this.toggleInfoModal} toggleEditModal={this.toggleEditModal} driveCancel={this.driveCancel} cancel={this.cancel} userInfo={userInfo} />}
          <Route path="/rider" render={() => <RiderPage filter={filter} fetchProfilePic={this.fetchProfilePic} newNoti={newNoti} oldNoti={oldNoti} clearNotification={this.clearNotification} rideFeed={rideFeed} upcomingRide={upcomingRide} fetchRideFeed={this.fetchRideFeed} fetchMoreRideFeed={this.fetchMoreRideFeed} fetchRideUpcoming={this.fetchRideUpcoming} userInfo={userInfo} join={this.join} logout={this.logout} cancel={this.cancel} driveCancel={this.driveCancel} edit={this.edit} toggleInfoModal={this.toggleInfoModal} toggleEditModal={this.toggleEditModal} />} />
          <Route path="/driver" render={() => <DriverPage fetchProfilePic={this.fetchProfilePic} newNoti={newNoti} oldNoti={oldNoti} clearNotification={this.clearNotification} post={this.post} driveHistory={driveHistory} upcomingDrive={upcomingDrive} fetchDriveHistory={this.fetchDriveHistory} fetchMoreDriveHistory={this.fetchMoreDriveHistory} fetchDriveUpcoming={this.fetchDriveUpcoming} userInfo={userInfo} join={this.join} logout={this.logout} driveCancel={this.driveCancel} toggleInfoModal={this.toggleInfoModal} toggleEditModal={this.toggleEditModal} />} />
          <Route path="/myaccount" render={() => <MyAccount fetchProfilePic={this.fetchProfilePic} newNoti={newNoti} oldNoti={oldNoti} clearNotification={this.clearNotification} userInfo={userInfo} cookieAuth={this.cookieAuth} logout={this.logout} />} />
          <Route path="/loginPage" render={() => <LoginPage login={this.login} />} />
          <Route path="/notification" render={() => <Notification fetchProfilePic={this.fetchProfilePic} newNoti={newNoti} oldNoti={oldNoti} clearNotification={this.clearNotification} />} />
        </div>
      </Router>
    );
  }
}

export default App;
