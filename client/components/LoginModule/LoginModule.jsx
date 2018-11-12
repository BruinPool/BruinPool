import React, { Component } from 'react';
import style from './LoginModule.css';

const axios = require('axios');

class LoginModule extends Component {
  constructor () {
    super();
    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  loginHandler (e) {
    const {
      email,
      password
    } = this.state;

    e.preventDefault();
    axios.get('/login', {
      params: {
        email,
        password,
      },
    })
      .then((response) => {
        if (response.data.length === 0) {
          alert('Email or password is incorrect');
        } else {
          alert(`welcome back ${response.data[0].username}`);
          this.props.login(response.data[0]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render () {
    const {
      email,
      password,
    } = this.state;

    return (
      <div className={style.mainContainer}>
        <div className={style.divideLine} />
        <form className={style.singupContainer} onSubmit={this.loginHandler}>
          <div className={style.content}>
            <input className={style.input} type="text" placeholder="Enter email" name="email" value={email} onChange={this.handleChange} required />
          </div>
          <div className={style.content}>
            <input className={style.input} type="password" placeholder="Enter password" name="password" value={password} onChange={this.handleChange} required />
          </div>
          <div className={style.content}>
            <button className={style.submitBtn} type="submit">
              Log in
            </button>
          </div>
        </form>
        <div className={style.divideLine} />
      </div>
    );
  }
}

export default LoginModule;
