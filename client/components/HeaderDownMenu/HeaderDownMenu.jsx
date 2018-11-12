import React, { Component } from 'react';
import style from './HeaderDownMenu.css';

class HeaderDownMenu extends Component {
  constructor () {
    super();

    this.highlightBtn = this.highlightBtn.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  highlightBtn (btn) {
    const { curPage } = this.props;

    if (btn === curPage) {
      return style[btn + 'BtnOn'];
    } else {
      return style[btn + 'BtnOff'];
    }
  }

  onClick (e) {
    const { changePage } = this.props;
    changePage(e.target.name);
  }

  render () {
    const { curPage } = this.props;

    return (
      <div className={style.HeaderDownMenu}>
        <div className={style.btns}>
          <div className={style.btnContainer}>
            <button className={curPage === 'rider' ? (style.btnOn) : (style.btnOff)} name="rider" onClick={this.onClick}>
              Rider
            </button>
          </div>
          <div className={style.btnContainer}>
            <button className={curPage === 'driver' ? (style.btnOn) : (style.btnOff)} name="driver" onClick={this.onClick}>
              Driver
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderDownMenu;
