import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import style from './FeedModuleEntry.css';

const axios = require('axios');

class FeedModuleEntry extends Component {
  constructor (props) {
    super(props);
    this.state = {
      expand: false,
      browserWidth: window.innerWidth,
      picUrl: '',
    };

    this.toggle = this.toggle.bind(this);
    this.join = this.join.bind(this);
    this.cancelHandle = this.cancelHandle.bind(this);
    this.driveCancelHandle = this.driveCancelHandle.bind(this);
    this.editHandle = this.editHandle.bind(this);
  }

  componentDidMount () {
    const { isModal, fetchProfilePic, entry } = this.props;
    if (isModal) {
      this.setState({ expand: true });
    }
    fetchProfilePic(entry.ownerUsername, (picUrl) => {
      this.setState({ picUrl });
    })
  }

  toggle () {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  join () {
    const { join, entry } = this.props;
    join(entry);
  }

  cancelHandle () {
    const { entry, cancel } = this.props;
    cancel(entry);

  }

  driveCancelHandle () {
    const { entry, driveCancel } = this.props;
    driveCancel(entry);
  }

  editHandle () {
    const { toggleEditModal, toggleInfoModal, entry } = this.props;
    toggleInfoModal(false);
    toggleEditModal(entry);
  }

  render () {
    const {
      entry,
      userInfo,
      isModal,
    } = this.props;

    const { expand, browserWidth, picUrl } = this.state;
    const myRide = entry.passengers.includes(userInfo.username);
    const myDrive = entry.ownerUsername === userInfo.username;
    const available = entry.seats > entry.passengers.length;
    let expandStyle;
    if (isModal) {
      expandStyle = style.modal;
    } else {
      expandStyle = style.FeedModuleEntryExpanded;
    }

    if (expand || browserWidth <= 480) {
      return (
        <div
        className={expandStyle}
        style={myRide ? ({ border: '1px solid #477a9b' }) : myDrive ? ({ border: '1px solid #f7b400' }) : ({ border: '1px solid #e4e4e4' })}
        >
          {(browserWidth > 480 && !isModal) && (
            <button className={style.expandBtn} type="button" onClick={this.toggle}>
              <i className="fas fa-angle-up" />
            </button>
          )}
          <div className={style.profilePicBox}>
            <img className={style.profilePic} src={picUrl} />
            <div className={style.ownerUsernameExpanded}>
              {entry.ownerUsername}
            </div>
            {myRide && (
              <div className={style.driverInfo}>
                <div className={style.driverEmail}>
                  {entry.ownerEmail}
                </div>
                <div className={style.driverPhoneNumber}>
                  {entry.ownerPhoneNumber}
                </div>
              </div>
            )}
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
          {myDrive && (
            <div className={style.passengersInfoBox}>
              Ridees
              <div className={style.margin} />
              {entry.passengers.map((passenger) => {
                return (
                  <div className={style.passengerInfo} name={passenger}>
                    {passenger}
                  </div>
                );
              })}
            </div>
          )}
          <div className={style.head}>
            Destination
          </div>
          <div className={style.margin} />
          <div className={style.entry}>
            {`${entry.from} to ${entry.to}`}
          </div>
          <div className={style.margin} />
          <div className={style.head}>
            Date/Time
          </div>
          <div className={style.margin} />
          <div className={style.entry}>
            {new Date(entry.date).toLocaleString().replace(/:\d{2}\s/, ' ')}
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
              <button className={style.driveEditBtn} type="button" onClick={this.editHandle}>
                Edit
              </button>
              <div className={style.marginBtn} />
              <button className={style.driveCancelBtn} type="button" onClick={this.driveCancelHandle}>
                Cancel
              </button>
            </div>
          ) : myRide ? (
            <button className={style.cancelBtn} type="button" onClick={this.cancelHandle}>
              Cancel
            </button>
          ) : available ? (
            <button className={style.joinBtn} type="button" onClick={this.join}>
              Join
            </button>
          ) : (
            <button className={style.joinBtnDisabled} type="button" disabled>
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
