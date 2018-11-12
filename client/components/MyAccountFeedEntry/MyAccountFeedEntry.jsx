import React, { Component } from 'react';
import style from './MyAccountFeedEntry.css';

class MyAccountFeedEntry extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const {
      entry,
      userInfo
    } = this.props;

    return (
      <div className={style.MyAccountFeedEntry}>
        <div className={style.detail}>
          <div className={style.destination}>
            {`${entry.from} to ${entry.to}`}
          </div>
          <div className={style.margin} />
          <div className={style.date}>
            {entry.date.toLocaleDateString()}
          </div>
        </div>
      </div>
    );
  }
}

export default MyAccountFeedEntry;
