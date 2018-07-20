/*global google*/

import React, {Component} from 'react';
import './App.css';
import MapStyles from './MapStyles';

class App extends Component {
  componentDidMount() {
    let map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 44.4318595,
        lng: 26.0991834
      },
      zoom: 14,
      styles: MapStyles
    });

    let service = new window.google.maps.places.PlacesService(map);

    service.nearbySearch({
      location: {
        lat: 44.4318595,
        lng: 26.0991834
      },
      radius: 4000,
      type: ['museum']
    }, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          new google.maps.Marker({
            position: results[i].geometry.location,
            title: results[i].name,
            map: map,
            animation: google.maps.Animation.DROP
          })
        }
      }
    });

  }

  render() {
    return <div id="map"></div>;
  }
}

export default App;
