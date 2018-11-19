import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import Select from 'react-select';
import style from './PostModule.css';

class PostModule extends Component {
  constructor () {
    super();
    this.state = {
      from: '',
      to: '',
      date: moment(),
      time: '',
      seats: '',
      price: '',
      detail: '',
      destination: [
        { value: 'SF Bay Area', label: 'SF Bay Area' },
        { value: 'Davis', label: 'Davis' },
        { value: 'Santa Barbara', label: 'Santa Barbara' },
        { value: 'Orange County', label: 'Orange County' },
        { value: 'San Diego', label: 'San Diego' },
      ],
    };

    this.handleFrom = this.handleFrom.bind(this);
    this.handleTo = this.handleTo.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick () {
    const { post, entry } = this.props;
    const {
      from,
      to,
      date,
      time,
      seats,
      price,
      detail,
    } = this.state;
    if (entry) {
      entry.from = from.label;
      entry.to = to.label;
      entry.date = date;
      entry.time = time;
      entry.seats = seats;
      entry.price = price;
      entry.detail = detail;
      post(entry);
    } else {
      post({
        from: from.label,
        to: to.label,
        date,
        time,
        seats,
        price,
        detail,
      });
    }
  }

  handleFrom (val) {
    this.setState({ from: val });
  }

  handleTo (val) {
    this.setState({ to: val });
  }

  handleDate (date) {
    this.setState({ date });
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render () {
    const {
      from,
      to,
      date,
      seats,
      price,
      detail,
      destination,
    } = this.state;

    const { entry } = this.props;

    const moduleStyle = {
      position: 'fixed',
      width: '315px',
      marginLeft: '10%',
      backgroundColor: 'white',
      border: '1px solid #e4e4e4',
      borderRadius: '5px',
      padding: '10px',
      marginTop: 'unset',
    };

    return (
      <div className={style.PostModule} style={!entry ? (moduleStyle) : ({})}>
        <form>
          <div className={style.fromWrapper}>
            <label>
              From
              <div className={style.from}>
                <Select
                  value={from}
                  onChange={this.handleFrom}
                  options={destination}
                  style={{ cursor: 'text' }}
                />
              </div>
            </label>
          </div>
          <div className={style.margin} />
          <div className={style.toWrapper}>
            <label>
              To
              <div>
                <Select
                  value={to}
                  onChange={this.handleTo}
                  options={destination}
                />
              </div>
            </label>
          </div>
          <div className={style.margin} />
          <div className={style.dateWrapper}>
            <label>
              Date / Time
              <div>
                <DatePicker
                  className={style.dateInput}
                  placeholderText="Click to select a date/time"
                  selected={date}
                  onChange={this.handleDate}
                  minDate={moment()}
                  showDisabledMonthNavigation
                  showTimeSelect
                  dateFormat="MM/DD LT"
                />
              </div>
            </label>
          </div>
          <div className={style.seatsWrapper}>
            <label>
              Seats
              <div>
                <input className={style.seatsInput} name="seats" value={seats} onChange={this.handleChange} />
              </div>
            </label>
          </div>
          <div className={style.priceWrapper}>
            <label>
              Price
              <div>
                <input className={style.priceInput} name="price" value={price} onChange={this.handleChange} />
              </div>
            </label>
          </div>
          <div className={style.margin} />
          <div className={style.detailWrapper}>
            <label>
              Detail
              <div>
                <textarea className={style.detailInput} name="detail" value={detail} onChange={this.handleChange} placeholder="Enter details" />
              </div>
            </label>
          </div>
        </form>
        <div className={style.margin} />
        <button className={style.postBtn} type="button" onClick={this.onClick}>
          {entry ? ('Save') : ('Post a Ride')}
        </button>
      </div>
    );
  }
}

export default PostModule;
