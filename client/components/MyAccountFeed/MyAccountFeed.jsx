import React, { Component } from 'react';
import style from './MyAccountFeed.css';
import MyAccountFeedEntry from '../MyAccountFeedEntry/MyAccountFeedEntry';

class MyAccountFeed extends Component {
  render () {
    const {
      feed,
    } = this.props;

    return (
      <div className={style.MyAccountFeed}>
        <div className={style.leftBtn}>
          {'<'}
        </div>
        {feed.map(entry => <MyAccountFeedEntry key={entry._id} entry={entry} />)}
        <div className={style.rightBtn}>
          {'>'}
        </div>
      </div>
    );
  }
}

export default MyAccountFeed;
