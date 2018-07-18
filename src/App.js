import React, { Component } from 'react';
import './App.css';
import MapComponent from './Map';

class App extends Component {
  render() {
    return (
      <MapComponent
        isMarkerShown={false}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBB9mgpOXLSD2ds0Yl3okmuQaUcJkMNPuI&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default App;
