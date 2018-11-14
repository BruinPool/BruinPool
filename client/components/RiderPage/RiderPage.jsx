import React, { Component } from 'react';
import style from './RiderPage.css';
import FilterModule from '../FilterModule/FilterModule';
import FeedModule from '../FeedModule/FeedModule';
import UpcomingFeed from '../UpcomingFeed/UpcomingFeed';
import { feed, upcoming } from '../mockData';

const axios = require('axios');

class RiderPage extends Component {
  constructor () {
    super();
    this.state = {
      rideFeed: [],
      upcomingRide: [],
    };

    this.fetch = this.fetch.bind(this);
    this.fetchUpcoming = this.fetchUpcoming.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentWillMount () {
    this.fetch(null);
    this.fetchUpcoming();
  }

  fetch (filter) {
    axios.get('/rideList', {
      params: {
        filter,
        type: 'list',
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

  fetchUpcoming () {
    const { userInfo } = this.props;

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

  cancel (entry) {
    const { userInfo } = this.props;
    const ind = entry.passengers.indexOf(userInfo.username);
    entry.passengers.splice(ind, 1);

    axios.put('/rideList', {
      entry,
    })
      .then((response) => {
        alert('canceld!');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render () {
    const { rideFeed, upcomingRide } = this.state;
    const { userInfo } = this.props;

    return (
      <div className={style.RiderPage}>
        <UpcomingFeed userInfo={userInfo} upcomingRide={upcomingRide} rideCancel={this.cancel} type="ride" />
        <FilterModule fetch={this.fetch} />
        <FeedModule userInfo={userInfo} rideFeed={rideFeed} cancel={this.cancel} />
      </div>
    );
  }
}

export default RiderPage;
