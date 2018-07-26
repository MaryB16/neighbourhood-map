/*global google*/
import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';

import './App.css';

import MapStyles from './MapStyles';
import FilterMenu from './FilterMenu';
import InfoWindow from './InfoWindow';

import initFoursquareAPI from 'react-foursquare-es5-mod';
import coffeeShopMarker from './icons/coffeeShopMarker.png';

const foursquare = initFoursquareAPI({
  clientID: 'B4YCTVS13CAVDHPSUCEE3V5CCZXIJTESKWLYKSGMEPBVGAC3',
  clientSecret: 'SHDYF1ZZ1YEB4IBJJGZNTE1QFGCGVG23JHKJ1BBCIWWHZWIW'
});

const foursquareQuery = {
  "ll": "44.4318595,26.0991834",
  "query": 'coffee,starbucks',
  "categoryId": '4bf58dd8d48988d1e0931735',
  "radius": 800
};

/**
 * Represents a Google Map component
 */
class Map extends Component {

  state = {
    markers: [],
    venues: [],
    foursquareError: false
  }

  /**
   * Fetches a list of venues from FourSquare and creates markers for each venue
   */
  fetchVenues = () => {
    foursquare.venues.getVenues(foursquareQuery).then(res => {
      const venues = res.response.venues
      let markers = []

      venues.forEach(venue => {
        const marker = this.createMarker(venue)
        markers.push(marker)
      })

      this.setState({
        venues: res.response.venues,
        markers: markers
      })
    })
    .catch (()=> {
      // When an error happens we set the state to something else
      this.setState({
        foursquareError: true
      })
    })
  }

  /**
   * Creates a marker for the specified venue then sets up event handlers
   */
  createMarker = (venue) => {
    const marker = new google.maps.Marker({
      position: {
        /*Offset added because foursquare markers are offset by a small amount*/
        lat: venue.location.lat + 0.0002,
        lng: venue.location.lng - 0.0004
      },
      icon: coffeeShopMarker,
      title: venue.name,
      map: this.map,
      id: venue.id,
      animation: google.maps.Animation.DROP
    });
    this.createMarkerEventListener(marker, venue);

    return marker;
  }

  /**
   * Sets up an event listner to the specified marker that opens a info window
   */
  createMarkerEventListener = (marker, venue) => {
    marker.addListener('click', () => {
      // Open info window for this marker
      if (this.infoWindow.marker !== marker) {
        this.infoWindow.marker = marker;
        this.infoWindow.setContent(
          ReactDOMServer.renderToString(
            <InfoWindow
              title={venue.name}
              address={venue.location.address ? venue.location.address : 'No address available' }
              webAddress={'https://foursquare.com/v/' + venue.id}
            />)
        );

        this.infoWindow.open(this.map, marker);
        this.infoWindow.addListener('closeclick', () => {
          this.infoWindow.setMarker = null;
          /*Remove bounce animation if the infoWindow is closed by user*/
          marker.setAnimation(null);
        });
      }

      // Remove the bounce animation from previous clicked markers
      this.state.markers.forEach(marker => marker.setAnimation(null));

      // Add bounce animation to the clicked marker
      if (marker.getAnimation() !== null)
        marker.setAnimation(null);
      else
        marker.setAnimation(google.maps.Animation.BOUNCE);
    });
  }

  /**
   * Creates a Google Maps map and info window object then fetches venues
   * from FourSquare
   */
  componentDidMount() {
    const mapOptions = {
      center: {
        lat: 44.434121,
        lng: 26.0971294
      },
      zoom: 16,
      styles: MapStyles,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT
      }
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.infoWindow = new google.maps.InfoWindow();

    this.fetchVenues();
  }

  render() {
    return (
      <div className="map-container">
        {this.state.foursquareError &&
          <h3 className='error-message'>Couldn't load locations. Please refresh page or try again later</h3>}

        <div id="map" role="application"></div>

        {this.props.isFilterHidden===false &&
          <FilterMenu
            role='menu'
            venues={this.state.venues}
            markers={this.state.markers}
          />}
      </div>
    )
  }
}

export default Map;
