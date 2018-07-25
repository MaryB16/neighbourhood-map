/*global google*/

import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';
import './App.css';
import MapStyles from './MapStyles';
import initFoursquareAPI from 'react-foursquare-es5-mod';
import InfoWindow from './InfoWindow'
import FilterMenu from './FilterMenu'
import coffeeShopMarker from './icons/coffeeShopMarker.png'
import Map from './Map'

class App extends Component {

  state = {
    isHidden:true
  }

  toggleMenu = () => {
    const {isHidden} = this.state
    if(isHidden) {
      this.setState({
        isHidden: false
      })
    }
    else {
      this.setState({
        isHidden: true
      })
    }
  }

  render() {
    return (
      <div className='wrapper'>
        <div className='header' aria-label='Header'>
          <button aria-label='Search for coffee shops'
            className='button'
            onClick={this.toggleMenu}>
          </button>
          <p tabIndex='1'>Coffee Shops near the city center of Bucharest</p>
        </div>
        <Map isFilterHidden={this.state.isHidden}>
        </Map>
      </div>
    )
  }
}

export default App;
