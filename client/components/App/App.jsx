import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Route, Link, Redirect, BrowserRouter as Router } from 'react-router-dom';
import style from './App.css';
import Header from '../Header/Header';
import LoginPage from '../LoginPage/LoginPage';
import DriverPage from '../DriverPage/DriverPage';
import RiderPage from '../RiderPage/RiderPage';
import MyAccount from '../MyAccount/MyAccount';


const axios = require('axios');

class App extends Component {

  constructor() {
    super();

    const cookies = new Cookies();

    this.state = {
      userInfo : cookies.get('userInfo') || false,
      isLoggedin : false,
      curPage : 'rider',
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.changePage = this.changePage.bind(this);
    this.driveCancel = this.driveCancel.bind(this);
  }

  login (data) {
    const cookies = new Cookies();

    cookies.set('userInfo', data, { path: '/' });
    this.setState({
      userInfo: data,
      isLoggedin: true
    });
  }

  logout () {
    const cookies = new Cookies();

    cookies.remove('userInfo');
    this.setState({
      userInfo: false,
    });
  }

  driveCancel (ride) {
    axios.delete('/rideList', {
      params: {
        ride,
      },
    })
      .then((res) => {
        alert('deleted!');
      })
      .catch((err) => {
        console.error(err);
      })
  }

  fetchMore () {
    const {
      multiplier,
      songList
    } = this.state;
    this.setState({
      multiplier: multiplier + 1
    });
    axios.get('/fetchMore', {
      params: { multiplier }
    })
      .then((response) => {
        this.setState({
          songList: songList.concat(response.data)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  changePage (page) {
    this.setState({ curPage: page });
  }

  render () {
    const { userInfo, curPage } = this.state;
    console.log(curPage)

    return (
      <div className={style.main}>
        {userInfo && <Header userInfo={userInfo} logout={this.logout} changePage={this.changePage} curPage={curPage} />}
        {curPage === 'rider' ? (
          <Redirect to="/rider" />
        ) : curPage === 'driver' ? (
          <Redirect to="/driver" />
        ) : (
          <Redirect to="/myaccount" />
        )}
        <Route path="/"
          render={props =>
            userInfo ? (
              <Redirect
                to={{
                  pathname: '/rider',
                }}
              />
            ) : (
              <Redirect
                to={{
                  pathname: '/loginPage',
                }}
              />
            )
          }
        />
        <Route path="/driver" render={() => <DriverPage userInfo={userInfo} logout={this.logout} changePage={this.changePage} curPage={curPage} driveCancel={this.driveCancel} />} />
        <Route path="/rider" render={() => <RiderPage userInfo={userInfo} logout={this.logout} changePage={this.changePage} curPage={curPage} driveCancel={this.driveCancel} />} />
        <Route path="/myaccount" render={() => <MyAccount userInfo={userInfo} logout={this.logout} changePage={this.changePage} curPage={curPage} />} />
        <Route path="/loginPage" render={() => <LoginPage login={this.login} />} />
      </div>
    )
  }
}

export default App;
