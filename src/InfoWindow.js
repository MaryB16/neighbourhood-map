import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';

class InfoWindow extends Component {
  render() {
    return (
      <div>
        <div>{this.props.title}</div>
        <div>{this.props.address}</div>
        <a target='_blank' href={this.props.webAddress}>Click here for details</a>
      </div>
    )
  }
}

export default InfoWindow;
