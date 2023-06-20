import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ClockItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: 0,
      minute: 0,
      second: 0,
    };
    this.timeInterval = null;
    this.setClock = this.setClock.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  render() {
    let { hour } = this.state;
    const { minute, second } = this.state;
    hour = hour > 12 ? hour - 12 : hour;
    const degreeSecond = 6 * second;
    const degreeMinute = (minute + second / 60) * 6;
    const degreeHour = (hour + minute / 60 + second / 3600) * 30;

    const rotateArrow = {
      hour: `rotate(${degreeHour})`,
      minute: `rotate(${degreeMinute})`,
      second: `rotate(${degreeSecond})`,
    };

    return (
      <>
        <div className='item-clock'>
          <p>{this.props.clocksSetup.name}</p>
          <svg width="150px" height="150px">
            <g transform="translate(75,75)">
              <g id="hour" transform={rotateArrow.hour}>
                <line strokeWidth="6" y2="-45" strokeLinecap="round" stroke="black" opacity=".5" />
              </g>
              <g id="minute" transform={rotateArrow.minute}>
                <line strokeWidth="4" y2="-70" strokeLinecap="round" stroke="black" opacity=".9" />
              </g>
              <g id="second" transform={rotateArrow.second}>
                <line strokeWidth="2" y1="10" y2="-75" strokeLinecap="round" stroke="black" />
              </g>
            </g>
          </svg>
          <p className='timer'>
            {this.state.hour < 10 ? `0${this.state.hour}` : this.state.hour}:
            {this.state.minute < 10 ? `0${this.state.minute}` : this.state.minute}:
            {this.state.second < 10 ? `0${this.state.second}` : this.state.second}</p>
          <div className="close" onClick={this.handleClose}>X</div>
        </div>
      </>
    );
  }

  handleClose() {
    this.props.onClose(this.props.clocksSetup.id);
  }

  setClock() {
    const date = new Date();
    const h = parseInt(date.getUTCHours(), 10) + parseInt(this.props.clocksSetup.timeZone, 10);
    const m = parseInt(date.getUTCMinutes(), 10);
    const s = parseInt(date.getUTCSeconds(), 10);

    this.setState({
      hour: h,
      minute: m,
      second: s,
    });
  }

  componentDidMount() {
    this.setClock();
    this.timeInterval = setInterval(this.setClock, 1000);
  }

  componentWillUnmount() {
    this.timeInterval = clearInterval(this.timeInterval);
  }
}

ClockItem.propTypes = {
  clocksSetup: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
