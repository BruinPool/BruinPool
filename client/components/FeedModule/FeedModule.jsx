import React, { Component } from 'react';
import style from './FeedModule.css';
import FeedModuleEntry from '../FeedModuleEntry/FeedModuleEntry';

class FeedModule extends Component {
  constructor (props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.filterCancel = this.filterCancel.bind(this);
  }

  onClick () {
    const { fetchMoreRideFeed } = this.props;
    fetchMoreRideFeed();
  }

  filterCancel() {
    const { fetchRideFeed } = this.props;
    fetchRideFeed(null);
  }

  render () {
    const {
      rideFeed,
      userInfo,
      cancel,
      driveCancel,
      toggleInfoModal,
      toggleEditModal,
      join,
      edit,
      fetchRideFeed,
      fetchRideUpcoming,
      driveFetch,
      driveFetchUpcoming,
      fetchProfilePic,
      filter,
    } = this.props;

    return (
      <div className={style.FeedModule}>
        <div className={style.head}>
          <div className={style.seats}>
            Seats
          </div>
          <div className={style.divider} />
          <div className={style.from}>
            From
          </div>
          <div className={style.divider} />
          <div className={style.to}>
            To
          </div>
          <div className={style.divider} />
          <div className={style.date}>
            Date
          </div>
          <div className={style.divider} />
          <div className={style.price}>
            Price
          </div>
        </div>
        {filter && (
          <div className={style.cancelFilterBox}>
            <button className={style.cancelFilterBtn} type="button" onClick={this.filterCancel}>
              Clear filter  <i className="fas fa-times-circle" />
            </button>
          </div>
        )}
        {rideFeed.map(entry => <FeedModuleEntry key={entry._id} join={join} fetchProfilePic={fetchProfilePic} fetchRideFeed={fetchRideFeed} toggleInfoModal={toggleInfoModal} fetchRideUpcoming={fetchRideUpcoming} driveFetch={driveFetch} driveFetchUpcoming={driveFetchUpcoming} entry={entry} userInfo={userInfo} edit={edit} cancel={cancel} driveCancel={driveCancel} toggleEditModal={toggleEditModal} />)}
        <button className={style.fetchMoreRideFeedBtn} type="button" onClick={this.onClick} >
          Load more
        </button>
      </div>
    );
  }
}

export default FeedModule;
