import React, { Component } from 'react';
import style from './FeedModuleEntry.css';

const axios = require('axios');

class FeedModuleEntry extends Component {
  constructor (props) {
    super(props);
    this.state = {
      expand: false,
      browserWidth: window.innerWidth,
    };

    this.toggle = this.toggle.bind(this);
    this.join = this.join.bind(this);
    this.cancelHandle = this.cancelHandle.bind(this);
  }

  toggle () {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  join () {
    const { entry, userInfo } = this.props;
    entry.passengers.push(userInfo.username);

    axios.put('/rideList', {
      entry,
    })
      .then((response) => {
        alert('joined!');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  cancelHandle () {
    const { entry, cancel } = this.props;

    cancel(entry);
  }

  render () {
    const {
      entry,
      userInfo
    } = this.props;

    const { expand, browserWidth } = this.state;
    const myRide = entry.passengers.includes(userInfo.username);
    const myDrive = entry.ownerUsername === userInfo.username;
    if (expand || browserWidth <= 480) {
      return (
        <div
        className={style.FeedModuleEntryExpanded}
        style={myRide ? ({ border: '1px solid #477a9b' }) : myDrive ? ({ border: '1px solid #f7b400' }) : ({ border: '1px solid #e4e4e4' })}
        >
          {browserWidth > 480 && (
            <button className={style.expandBtn} type="button" onClick={this.toggle}>
              <i className="fas fa-angle-up" />
            </button>
          )}
          <div className={style.profilePic}>
            <i className="fas fa-user-circle" />
          </div>
          <div className={style.ownerUsernameExpanded}>
            {entry.ownerUsername}
          </div>
          <div className={style.margin} />
          <div className={style.divider} />
          <div className={style.margin} />
          <div className={style.seatsExpanded}>
            {entry.passengers.length === entry.seats ? (
              'All seats are reserved'
            ) : (
              `${entry.seats - entry.passengers.length} seats available`
            )}
          </div>
          <div className={style.head}>
            Destination
          </div>
          <div className={style.margin} />
          <div className={style.entry}>
            {`${entry.from} to ${entry.to}`}
          </div>
          <div className={style.margin} />
          <div className={style.head}>
            Date
          </div>
          <div className={style.margin} />
          <div className={style.entry}>
            {new Date(entry.date).toLocaleDateString()}
          </div>
          <div className={style.margin} />
          <div className={style.head}>
            Price
          </div>
          <div className={style.margin} />
          <div className={style.entry}>
            $
            {entry.price}
          </div>
          <div className={style.margin} />
          <div className={style.detailExpanded}>
            {entry.detail}
          </div>
          <div className={style.margin} />
          {myDrive ? (
            <div>
              <button className={style.driveEditBtn} type="button" onClick={this.cancelHandle}>
                Edit
              </button>
              <div className={style.marginBtn} />
              <button className={style.driveCancelBtn} type="button" onClick={this.cancelHandle}>
                Cancel
              </button>
            </div>
          ) : myRide ? (
            <button className={style.cancelBtn} type="button" onClick={this.cancelHandle}>
              Cancel
            </button>
          ) : (
            <button className={style.joinBtn} type="button" onClick={this.join}>
              Join
            </button>
          )}
        </div>
      );
    }

    return (
      <div
        className={style.FeedModuleEntry}
        style={myRide ? ({ border: '1px solid #477a9b' }) : myDrive ? ({ border: '1px solid #f7b400' }) : ({ border: '1px solid #e4e4e4' })}
        onClick={this.toggle}
      >
        <div className={style.seats}>
          {`${entry.passengers.length} / ${entry.seats}`}
        </div>
        <div className={style.from}>
          {entry.from}
        </div>
        <div className={style.to}>
          {entry.to}
        </div>
        <div className={style.date}>
          {new Date(entry.date).toLocaleDateString()}
        </div>
        <div className={style.price}>
          $
          {entry.price}
        </div>
      </div>
    );
  }
}

export default FeedModuleEntry;
