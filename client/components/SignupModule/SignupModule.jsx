import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './SignupModule.css';

const axios = require('axios');

class SignupModule extends Component {
  constructor () {
    super();
    this.state = {
      email: '',
      password: '',
      username: '',
      phoneNumber: '',
      emailValidation: -1,
      passwordValidation: -1,
      usernameValidation: -1,
      phoneNumberValidation: -1,

    };
    this.handleChange = this.handleChange.bind(this);
    this.singupHandler = this.singupHandler.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
    this.validatePhoneNumber = this.validatePhoneNumber.bind(this);
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  validateEmail (e) {
    if (e.target.value.length === 0) {
      this.setState({ emailValidation: -1 });
      return;
    }

    if (!e.target.value.includes('.com') || !e.target.value.includes('@')) {
      this.setState({ emailValidation: 2 });
      return;
    }

    axios.get('/emailValidation', {
      params: {
        email: e.target.value,
      },
    })
      .then((response) => {
        if (response.data.length !== 0) {
          this.setState({ emailValidation: 0 });
        } else {
          this.setState({ emailValidation: 1 });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  validatePassword (e) {
    if (e.target.value.length >= 8) {
      this.setState({ passwordValidation: 1 });
    } else {
      this.setState({ passwordValidation: 0 });
    }
  }

  validateUsername (e) {
    if (e.target.value.length === 0) {
      this.setState({ usernameValidation: -1 });
      return;
    }
    if (e.target.value.length < 4 || e.target.value.length > 10) {
      this.setState({ usernameValidation: 2 });
      return;
    }

    axios.get('/usernameValidation', {
      params: {
        username: e.target.value
      }
    })
      .then((response) => {
        if (response.data.length !== 0) {
          this.setState({ usernameValidation: 0 });
        } else {
          this.setState({ usernameValidation: 1 });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  validatePhoneNumber (e) {
    if (e.target.value.length === 0) {
      this.setState({ phoneNumberValidation: -1 });
      return;
    }
    if (e.target.value.length !== 10 || isNaN(parseInt(e.target.value))) {
      this.setState({ phoneNumberValidation: 2 });
      return;
    }

    axios.get('/phoneNumberValidation', {
      params: {
        phoneNumber: e.target.value,
      },
    })
      .then((response) => {
        if (response.data.length !== 0) {
          this.setState({ phoneNumberValidation: 0 });
        } else {
          this.setState({ phoneNumberValidation: 1 });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  enableSubmitBtn () {
    const {
      emailValidation,
      passwordValidation,
      usernameValidation,
      phoneNumberValidation,
    } = this.state;
    if (
      emailValidation === 1 &&
      passwordValidation === 1 &&
      usernameValidation === 1 &&
      phoneNumberValidation === 1
    ) {
      return (
        <button className={style.submitBtnEanbled} type="submit">
          Sign up
        </button>
      );
    }
    return (
      <button className={style.submitBtnDisabled} disabled={true}>
        Sign up
      </button>
    );
  }

  singupHandler (e) {
    const {
      email,
      password,
      username,
      phoneNumber,
    } = this.state;
    const { login } = this.props;

    e.preventDefault();

    axios.post('/signup', {
      email,
      password,
      username,
      phoneNumber,
      posting_list: [],
      participate: [],
      picUrl: 'https://s3-us-west-1.amazonaws.com/bruinpoolprofilepics/bucketFolder/Bear+without+wheel+BLACK.png',
      webandList: [],
      ownedWeband: [],
    })
      .then((response) => {
        if (response.status === 200) {
          alert('Username or Password in use');
        } else {
          alert('Welcome to BruinPool!');
          login(email, password);
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
      username,
      phoneNumber,
      emailValidation,
      passwordValidation,
      usernameValidation,
      phoneNumberValidation,
    } = this.state;

    return (
      <div className={style.mainContainer}>
        <div className={style.signupDescription}>
          Bruin Pool<br />
          Best Pool
        </div>
        <div className={style.divideLine} />
        <form className={style.singupContainer} onSubmit={this.singupHandler}>
          <div className={style.content}>
            {(() => {
              switch (emailValidation) {
                case 0: return (
                  <div>
                    <input className={style.inputValidationFail} onBlur={this.validateEmail} name="email" placeholder="Enter email" value={email} onChange={this.handleChange} required />
                    <div className={style.validationFail}>
                      Email address in use.
                    </div>
                  </div>
                );
                case 1: return (
                  <input className={style.inputValidationPass} onBlur={this.validateEmail} name="email" placeholder="Enter email" value={email} onChange={this.handleChange} required />
                );
                case 2: return (
                  <div>
                    <input className={style.inputValidationFail} onBlur={this.validateEmail} name="email" placeholder="Enter email" value={email} onChange={this.handleChange} required />
                    <div className={style.validationFail}>
                      Invalid email format.
                    </div>
                  </div>
                );
                default: return (
                  <input className={style.input} onBlur={this.validateEmail} name="email" placeholder="Enter email" value={email} onChange={this.handleChange} required />
                );
              }
            })()}
          </div>
          <div className={style.content}>
            {(() => {
              switch (passwordValidation) {
                case 0: return (
                  <div>
                    <input className={style.inputValidationFail} onBlur={this.validatePassword} name="password" type="password" placeholder="Enter password" value={password} onChange={this.handleChange} required />
                    <div className={style.validationFail}>
                      Password must be longer than 8 characters.
                    </div>
                  </div>
                );
                case 1: return (
                  <input className={style.inputValidationPass} onBlur={this.validatePassword} name="password" type="password" placeholder="Enter password" value={password} onChange={this.handleChange} required />
                );
                default: return (
                  <input className={style.input} onBlur={this.validatePassword} name="password" type="password" placeholder="Enter password" value={password} onChange={this.handleChange} required />
                );
              }
            })()}
          </div>
          <div className={style.content}>
            {(() => {
              switch (usernameValidation) {
                case 0: return (
                  <div>
                    <input className={style.inputValidationFail} onBlur={this.validateUsername} name="username" placeholder="Enter username" value={username} onChange={this.handleChange} required />
                    <div className={style.validationFail}>
                      Username in use.
                    </div>
                  </div>
                );
                case 1: return (
                  <input className={style.inputValidationPass} onBlur={this.validateUsername} name="username" placeholder="Enter username" value={username} onChange={this.handleChange} required />
                );
                case 2: return (
                  <div>
                    <input className={style.inputValidationFail} onBlur={this.validateUsername} name="username" placeholder="Enter username" value={username} onChange={this.handleChange} required />
                    <div className={style.validationFail}>
                      Username must be 4 to 10 characters
                    </div>
                  </div>
                );
                default: return (
                  <input className={style.input} onBlur={this.validateUsername} name="username" placeholder="Enter username" value={username} onChange={this.handleChange} required />
                );
              }
            })()}
          </div>
          <div className={style.content}>
            {(() => {
              switch (phoneNumberValidation) {
                case 0: return (
                  <div>
                    <input className={style.inputValidationFail} onBlur={this.validatePhoneNumber} name="phoneNumber" placeholder="Enter phone Number(No '-' or space)" value={phoneNumber} onChange={this.handleChange} required />
                    <div className={style.validationFail}>
                      Phone number in use.
                    </div>
                  </div>
                );
                case 1: return (
                  <input className={style.inputValidationPass} onBlur={this.validatePhoneNumber} name="phoneNumber" placeholder="Enter phone Number(No '-' or space)" value={phoneNumber} onChange={this.handleChange} required />
                );
                case 2: return (
                  <div>
                    <input className={style.inputValidationFail} onBlur={this.validatePhoneNumber} name="phoneNumber" placeholder="Enter phone Number(No '-' or space)" value={phoneNumber} onChange={this.handleChange} required />
                    <div className={style.validationFail}>
                      Invalid format
                    </div>
                  </div>
                );
                default: return (
                  <input className={style.input} onBlur={this.validatePhoneNumber} name="phoneNumber" placeholder="Enter phone Number(No '-' or space)" value={phoneNumber} onChange={this.handleChange} required />
                );
              }
            })()}
          </div>
          <div className={style.content}>
            {this.enableSubmitBtn()}
          </div>
          <div className={style.divideLine} />
        </form>
      </div>
    );
  }
}

export default SignupModule;
