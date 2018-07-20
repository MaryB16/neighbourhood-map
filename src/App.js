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
    let markers =[];
    let largeInfowindow = new google.maps.InfoWindow();

    let placeMarkers = (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        results.forEach(function(result){
          let marker = new google.maps.Marker({
            position: result.geometry.location,
            title: result.name,
            map: map,
            id:result.id,
            animation: google.maps.Animation.DROP
          })
          markers.push(marker)
          marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          })

          function populateInfoWindow(marker, infowindow) {
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
          });
        }
      }

          console.log(marker)
        })
      }
    }

    service.nearbySearch({
      location: {
        lat: 44.4318595,
        lng: 26.0991834
      },
      radius: 5000,
      type: ['museum']
    }, placeMarkers);
  }

  render() {
    return <div id="map"></div>;
  }
}

export default App;
