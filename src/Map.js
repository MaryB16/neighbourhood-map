/*global google*/
import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';
import './App.css';
import MapStyles from './MapStyles';
import FilterMenu from './FilterMenu';
import initFoursquareAPI from 'react-foursquare-es5-mod';
import InfoWindow from './InfoWindow'
import coffeeShopMarker from './icons/coffeeShopMarker.png'

let client = {
  clientID: 'B4YCTVS13CAVDHPSUCEE3V5CCZXIJTESKWLYKSGMEPBVGAC3',
  clientSecret: 'SHDYF1ZZ1YEB4IBJJGZNTE1QFGCGVG23JHKJ1BBCIWWHZWIW'
}

let foursquare = initFoursquareAPI(client);

let params = {
  "ll": "44.4318595,26.0991834",
  "query": 'coffee,starbucks',
  "categoryId": '4bf58dd8d48988d1e0931735',
  "radius": 800
};

class Map extends Component {

  state = {
    markers: [],
    venues: []
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

            //Remove the bounce animation from previous clicked markers
            markers.forEach(marker => marker.setAnimation(null))
            //Add bounce animation to the clicked marker
            toggleBounce(this)
          })

        function toggleBounce() {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          }
          else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
        }

          function populateInfoWindow(marker, infowindow) {
            if (infowindow.marker !== marker) {
              infowindow.marker = marker;

              infowindow.setContent(
                ReactDOMServer.renderToString(
                  <InfoWindow
                    title={venue.name}
                    address ={venue.location.address ? venue.location.address : 'No address available' }
                    webAddress ={'https://foursquare.com/v/' + venue.id}
                  />)
              );
              infowindow.open(map, marker);
              infowindow.addListener('closeclick', function() {
                infowindow.setMarker = null;
                /*Remove bounce animation if the infoWindow is closed by user*/
                marker.setAnimation(null);
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
      <div className="mapContainer">
        <div id="map" role="application"></div>
        {this.props.isFilterHidden===false &&
          <FilterMenu
            role='menu'
            venues ={this.state.venues}
            markers ={this.state.markers}
          />}
      </div>
    )
  }
}

export default Map;
