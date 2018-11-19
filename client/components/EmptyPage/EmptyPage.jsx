import React, { Component } from 'react';
import style from './EmptyPage.css';

class EmptyPage extends Component {
  render () {
    const { page } = this.props;

    if (page === 'driver') {
      return (
        <div className={style.driverPage}>
          <div className={style.outerWrapper}>
            <div className={style.innerWrapper}>
              <i className="fas fa-car-side" />
              <div className={style.logo}>
                Drive Mor!
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={style.riderPage}>
        <div className={style.outerWrapperRider}>
          <div className={style.innerWrapper}>
            <i className="fas fa-car-side" />
            <div className={style.logo}>
              No result
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmptyPage;
