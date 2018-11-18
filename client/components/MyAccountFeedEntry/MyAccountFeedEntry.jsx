import React, { Component } from 'react';
import style from './MyAccountFeedEntry.css';

class MyAccountFeedEntry extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const {
      entry,
      userInfo,
    } = this.props;

    const myDrive = entry.ownerUsername === userInfo.username;
    const myRide = entry.passengers.includes(userInfo.username);

    return (
      <div className={style.MyAccountFeedEntry}>
        <div className={style.detail}>
          <div className={style.destination}>
            {entry.from} to
            <br />
            {entry.to}
          </div>
          <div className={style.margin} />
          <div className={style.date}>
            {new Date(entry.date).toLocaleDateString()}
          </div>
          <div className={style.price}>
            {entry.price}
          </div>
            {myDrive ? (
              <div className={style.passengersName}>
                {entry.passengers.map((user) => {
                  return (
                    <div className={style.individualName}>
                      {user}
                    </div>
                  );
                })
                }
              </div>
            ) : (
              <div className={style.driverName}>
                {entry.ownerUsername}
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default MyAccountFeedEntry;
