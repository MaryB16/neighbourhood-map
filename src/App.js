/*global google*/

import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';
import './App.css';
import MapStyles from './MapStyles';
import initFoursquareAPI from 'react-foursquare';
import InfoWindow from './InfoWindow'

const results = [
  {
    title: "locationOne",
    position: {
      lat: 44.4314812,
      lng: 26.0983232
    }
  }, {
    title: "locationTwo",
    position: {
      lat: 44.431877,
      lng: 26.101609
    }
  }
]

console.log(ReactDOMServer.renderToString(<InfoWindow/>))

let client = {
  clientID: 'B4YCTVS13CAVDHPSUCEE3V5CCZXIJTESKWLYKSGMEPBVGAC3',
  clientSecret: 'SHDYF1ZZ1YEB4IBJJGZNTE1QFGCGVG23JHKJ1BBCIWWHZWIW'
}

var foursquare = initFoursquareAPI(client);

var params = {
  "ll": "44.4318595,26.0991834",
  "query": 'coffee,starbucks',
  "categoryId": '4bf58dd8d48988d1e0931735',
  "radius": 1000

};

class App extends Component {
  componentDidMount() {
    let map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 44.4318595,
        lng: 26.0991834
      },
      zoom: 16,
      styles: MapStyles
    });

    let markers = [];
    let largeInfowindow = new google.maps.InfoWindow();

    results.forEach(function(result) {
      let marker = new google.maps.Marker({position: result.position, title: result.title, map: map, animation: google.maps.Animation.DROP})

      markers.push(marker)
      marker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow);
      })

      function populateInfoWindow(marker, infowindow) {
        if (infowindow.marker !== marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          infowindow.addListener('closeclick', function() {
            infowindow.setMarker = null;
          });
        }
      }
      console.log(markers)

      foursquare.venues.getVenues(params).then(res => {
        console.log("I am a baba and I want to read slowly")
        console.log(res.response.venues)
        res.response.venues.forEach(venue => {
          let marker = new google.maps.Marker({position: venue.location, title: venue.name, map: map, animation: google.maps.Animation.DROP})
          console.log(marker)
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
      });
    })
  }

  render() {
    return <div id="map"></div>;
  }
}

export default App;
