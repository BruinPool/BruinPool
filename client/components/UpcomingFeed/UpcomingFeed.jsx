import React from 'react';
import style from './UpcomingFeed.css';
import UpcomingFeedEntry from '../UpcomingFeedEntry/UpcomingFeedEntry';

const UpcomingFeed = ({ upcomingRide, userInfo, fetchProfilePic, rideCancel, driveCancel, type, join, toggleInfoModal, toggleEditModal, fetchRideFeed, fetchRideUpcoming, fetchDriveHistory, fetchDriveUpcoming }) => {
  return (
    <div className={style.UpcomingFeed}>
      <div className={style.head}>
        Upcoming
        {type === 'drive' ? (<span className={style.driveHead}> drives</span>) : (<span className={style.rideHead}> rides</span>)}
      </div>
      {upcomingRide.map((entry) => {
        return (
          <UpcomingFeedEntry
            key={entry._id}
            entry={entry}
            userInfo={userInfo}
            rideCancel={rideCancel}
            driveCancel={driveCancel}
            type={type}
            toggleInfoModal={toggleInfoModal}
            toggleEditModal={toggleEditModal}
            fetchRideFeed={fetchRideFeed}
            fetchRideUpcoming={fetchRideUpcoming}
            fetchDriveHistory={fetchDriveHistory}
            fetchDriveUpcoming={fetchDriveUpcoming}
            join={join}
            fetchProfilePic={fetchProfilePic}
          />
        );
      })
      }
    </div>
  );
};

export default UpcomingFeed;
