import React, {Component} from 'react';

class InfoWindow extends Component {
  render() {
    return (
      <div tabIndex='0' aria-label={`${this.props.title} information`} className='infoWindow'>
        <h3>{this.props.title}</h3>
        <p tabIndex='0 '>{`Street: ${this.props.address}`}</p>
        <a target='_blank' href={this.props.webAddress}>Click here for details</a>
      </div>
    )
  }
}

export default InfoWindow;
