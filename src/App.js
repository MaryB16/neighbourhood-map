/*global google*/

import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';
import './App.css';
import MapStyles from './MapStyles';
import initFoursquareAPI from 'react-foursquare';
import InfoWindow from './InfoWindow'
import FilterMenu from './FilterMenu'
import coffeeShopMarker from './icons/coffeeShopMarker.png'

let client = {
  clientID: 'B4YCTVS13CAVDHPSUCEE3V5CCZXIJTESKWLYKSGMEPBVGAC3',
  clientSecret: 'SHDYF1ZZ1YEB4IBJJGZNTE1QFGCGVG23JHKJ1BBCIWWHZWIW'
}

var foursquare = initFoursquareAPI(client);

var params = {
  "ll": "44.4318595,26.0991834",
  "query": 'coffee,starbucks',
  "categoryId": '4bf58dd8d48988d1e0931735',
  "radius": 800

};

class App extends Component {

  state = {
    markers: [],
    venues: [],
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

  componentDidMount() {
    let map = new google.maps.Map(document.getElementById('map'), {
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

    });

    let largeInfowindow = new google.maps.InfoWindow();
      foursquare.venues.getVenues(params).then(res => {
        console.error("these are the venues")
        console.log(res.response.venues)
        let venues = res.response.venues
        let markers = []

        venues.forEach(venue => {
          let marker = new google.maps.Marker({
            position: {
              /*Offset added because foursquare markers are offset by a small amount*/
              lat: venue.location.lat + 0.0002,
              lng: venue.location.lng - 0.0004
            },
            icon:coffeeShopMarker,
            title: venue.name,
            map: map,
            id:venue.id,
            animation: google.maps.Animation.DROP})
          markers.push(marker)
          marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          })

          function populateInfoWindow(marker, infowindow) {
            if (infowindow.marker !== marker) {
              infowindow.marker = marker;

              infowindow.setContent(
                ReactDOMServer.renderToString(
                  <InfoWindow
                    title={venue.name}
                    address ={venue.location.address}
                    webAddress ={'https://foursquare.com/v/' + venue.id}
                  />)
              );
              infowindow.open(map, marker);
              infowindow.addListener('closeclick', function() {
                infowindow.setMarker = null;
              });
            }
          }
        })

        this.setState({
          venues: res.response.venues,
          markers: markers
        })
      });
  }

  render() {
    return (
      <div className='wrapper'>
        <div className='header'>
          <button
            className="button"
            onClick={this.toggleMenu}>
          </button>
          <p>Coffee Shops near the city center of Bucharest</p>
        </div>
        <div id="map"></div>

        {this.state.isHidden===false &&
          <FilterMenu
            venues ={this.state.venues}
            markers ={this.state.markers}
          />}
      </div>
    )
  }
}

export default App;
