import React, { Component } from 'react';
import style from './RiderPage.css';
import Header from '../Header/Header';
import FilterModule from '../FilterModule/FilterModule';
import FeedModule from '../FeedModule/FeedModule';
import UpcomingFeed from '../UpcomingFeed/UpcomingFeed';
import UpcomingFeedEntry from '../UpcomingFeedEntry/UpcomingFeedEntry';
import { feed, upcoming } from '../mockData';

const axios = require('axios');

class RiderPage extends Component {
  constructor () {
    super();
    this.state = {
      rideFeed: feed,
      upcomingRide: upcoming,
    },

    this.fetchRideFeed = this.fetchRideFeed.bind(this);
  }

  componentDidMount () {
    const { userInfo } = this.props;

    // this.fetchRideFeed(userInfo.username);
  }

  fetchRideFeed (filter) {
    axios.get('/rideList', {
      params: {
        filter,
      },
    })
      .then((response) => {
        this.setState({
          rideFeed: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }


  render () {
    const { rideFeed, upcomingRide } = this.state;
    const { userInfo, logout, changePage, curPage } = this.props;

    return (
      <div className={style.RiderPage}>
        <FilterModule fetchRideFeed={this.fetchRideFeed} />
        <FeedModule userInfo={userInfo} rideFeed={rideFeed} />
        <UpcomingFeed userInfo={userInfo} upcomingRide={upcomingRide} />
      </div>
    );
  }
}

export default RiderPage;
