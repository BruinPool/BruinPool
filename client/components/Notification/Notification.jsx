import React, { Component } from 'react';
import style from './Notification.css';
import NotificationEntry from '../NotificationEntry/NotificationEntry';

class Notification extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { newNoti, oldNoti, dropDown } = this.props;

    return (
      <div className={style.notiBox}>
        <div>
          <div className={style.notiHead}>
            New
          </div>
          <div className={style.divider} />
          {newNoti.map((item) => {
            return (
              <div className={style.noti}>
                {item.msg}
              </div>
            );
          })}
        </div>
        <div>
          <div className={style.notiHead}>
            Old
          </div>
          <div className={style.divider} />
          {oldNoti.map((item) => {
            return (
              <div className={style.noti}>
                {item.msg}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Notification;
