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
    isHidden: true,
    isScriptLoaded: false,
    loadingMessage: "Loading map"
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

  componentDidMount() {
    let googleMapScript = document.createElement("script")
    googleMapScript.onload = () => {
      this.setState({
        isScriptLoaded: true
      })
    }

    googleMapScript.onerror = () => {
      this.setState({
        isScriptLoaded: false,
        loadingMessage: "Google Maps failed to load"
      })
    }
    googleMapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBB9mgpOXLSD2ds0Yl3okmuQaUcJkMNPuI&libraries=places/'
    document.head.appendChild(googleMapScript);
  }

  render() {
    return (
      <div className='wrapper'>
        <div className='header' aria-label='header'>
          <button aria-label='Search for coffee shops'
            className='button'
            onClick={this.toggleMenu}>
          </button>
          <p tabIndex='1'>Coffee Shops near the city center of Bucharest</p>
        </div>
        {this.state.isScriptLoaded ?
          <Map isFilterHidden={this.state.isHidden} /> :
          <h3 className="error-message">{this.state.loadingMessage}</h3>}
        <div className='footer' role='footer' aria-hidden= 'true'>
          <p>{'Powered by '}</p>
          <a target='_blank' href='https://foursquare.com'>Foursquare</a>
        </div>
      </div>
    )
  }
}

export default App;
