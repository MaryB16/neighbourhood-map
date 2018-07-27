
import React, {Component} from 'react';
import './App.css';
import Map from './Map';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBB9mgpOXLSD2ds0Yl3okmuQaUcJkMNPuI';

/**
 * Entry point for the Neighbourhood Coffee shop app
 */
class App extends Component {

  state = {
    isFilterMenuHidden: true,
    isScriptLoaded: false,
    loadingMessage: 'Loading map'
  }

  /**
   * Toggles the side menu visibility state
   */
  toggleMenu = () => {
    const {isFilterMenuHidden} = this.state;
    if(isFilterMenuHidden) {
      this.setState({
        isFilterMenuHidden: false
      });
    }
    else {
      this.setState({
        isFilterMenuHidden: true
      });
    }
  }

  /**
   * Adds the google maps script to the page
   */
  loadScript = () => {
    const googleMapScript = document.createElement('script');
    googleMapScript.onload = () => {
      this.setState({
        isScriptLoaded: true
      });
    }

    googleMapScript.onerror = () => {
      this.setState({
        isScriptLoaded: false,
        loadingMessage: 'Google Maps failed to load'
      });
    }
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places/`;
    document.head.appendChild(googleMapScript);

    window.gm_authFailure = () => {
      this.setState({
        isScriptLoaded: false,
        loadingMessage: 'Google Maps is not configured properly. Please try again later'
      });
    };
  }

  componentDidMount() {
    this.loadScript();
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
          <Map isFilterHidden={this.state.isFilterMenuHidden} /> :
          <h3 className="error-message">{this.state.loadingMessage}</h3>}
        <div className='footer' aria-hidden= 'true'>
          <p>{'Powered by '}</p>
          <a href='https://foursquare.com' rel='noreferrer noopener'>Foursquare</a>
        </div>
      </div>
    )
  }
}

export default App;
