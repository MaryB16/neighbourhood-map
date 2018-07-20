/*global google*/

import React, {Component} from 'react';
import './App.css';
import MapStyles from './MapStyles';

const results =  [
  {title:"locationOne", position:{ lat: 44.4314812, lng: 26.0983232 }},
  {title:"locationTwo", position:{ lat: 44.431877, lng: 26.101609 }}
]

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
      let marker = new google.maps.Marker({
         position: result.position,
         title: result.title,
         map: map,
         animation: google.maps.Animation.DROP
       })

      markers.push(marker)
      marker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow);
      })

      function populateInfoWindow(marker, infowindow) {
        if (infowindow.marker !== marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
          });
        }
      }
      console.log(markers)
    })
  }

  render() {
    return <div id="map"></div>;
  }
}

export default App;
