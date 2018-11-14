import React, { Component } from 'react';
import style from './EmptyPage.css';

class EmptyPage extends Component {
  render () {
    const { page } = this.props;

    return (
      <div className={style.EmptyPage}>
        {page === 'driver' ? (
          <div className={style.outerWrapper}>
            <div className={style.innerWrapper}>
              <i className="fas fa-car-side" />
              <div className={style.logo}>
                Drive Mor!
              </div>
            </div>
          </div>
        ) : (
          <div className={style.outerwrapper}>
            <div className={style.innerWrapper}>
              <i className="fas fa-car-side" />
              <div className={style.logo}>
                Drive Mor!
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default EmptyPage;
