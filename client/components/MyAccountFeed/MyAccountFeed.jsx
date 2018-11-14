import React, { Component } from 'react';
import style from './MyAccountFeed.css';
import MyAccountFeedEntry from '../MyAccountFeedEntry/MyAccountFeedEntry';

class MyAccountFeed extends Component {
  constructor() {
    super();
    this.state = {
      browserWidth: window.innerWidth,
    };
  }

  render () {
    const {
      feed,
      userInfo,
    } = this.props;
    const { browserWidth } = this.state;

    return (
      <div className={style.MyAccountFeed}>
        {browserWidth > 480 && (
          <div className={style.leftBtn}>
            <i className="fas fa-chevron-circle-left" />
          </div>
        )}
        {feed.map(entry => <MyAccountFeedEntry key={entry._id} entry={entry} userInfo={userInfo} />)}
        {browserWidth > 480 && (
          <div className={style.rightBtn}>
            <i className="fas fa-chevron-circle-right" />
          </div>
        )}
      </div>
    );
  }
}

export default MyAccountFeed;
