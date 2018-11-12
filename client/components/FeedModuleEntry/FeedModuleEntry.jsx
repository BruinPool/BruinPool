import React, { Component } from 'react';
import style from './FeedModuleEntry.css';

class FeedModuleEntry extends Component {
  constructor (props) {
    super(props);
    this.state = {
      expand: false,
    }
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

    const { expand } = this.state;

    if (expand) {
      return (
        <div className={style.FeedModuleEntryExpanded}>
          <button className={style.expandBtn} type="button" onClick={this.onClick}>
            ^
          </button>
          <div className={style.ownerUsernameExpanded}>
            {entry.ownerUsername}
          </div>
          <div className={style.margin} />
          <div className={style.divider} />
          <div className={style.margin} />
          <div className={style.seatsExpanded}>
            {entry.seats} seats available
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
            {entry.date.toLocaleDateString()}
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
          <button className={style.joinBtn} type="button" onClick={this.onClick}>
            Join
          </button>
        </div>
      );
    }

    return (
      <div className={style.FeedModuleEntry} onClick={this.onClick}>
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
          {entry.date.toLocaleDateString()}
        </div>
        <div className={style.price}>
          {entry.price}
        </div>
      </div>
    );
  }
}

export default FeedModuleEntry;
