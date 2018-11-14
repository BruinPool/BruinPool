import React, { Component } from 'react';
import style from './RideHistoryEntry.css';

class RideHistoryEntry extends Component {
  constructor (props) {
    super(props);
    this.state = {
      expand: false,
      browserWidth: window.innerWidth,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick () {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  render () {
    const {
      entry,
      userInfo
    } = this.props;

    const { expand, browserWidth } = this.state;

    if (expand || browserWidth <= 480) {
      return (
        <div className={style.RideHistoryEntryExpanded}>
          <button className={style.expandBtn} type="button" onClick={this.onClick}>
            <i className="fas fa-angle-up" />
          </button>
          <div className={style.statusExpanded}>
            Completed
          </div>
          <div className={style.margin} />
          <div className={style.divider} />
          <div className={style.margin} />
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
            {entry.price}
          </div>
          <div className={style.margin} />
          <div className={style.detailExpanded}>
            {entry.detail}
          </div>
          <div className={style.margin} />
          <div className={style.passengers}>
            Render passengers pic/username
          </div>
        </div>
      );
    }

    return (
      <div className={style.RideHistoryEntry} onClick={this.onClick}>
        <div className={style.seats}>
          {entry.seats}
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
          {entry.price}
        </div>
      </div>
    );
  }
}

export default RideHistoryEntry;
