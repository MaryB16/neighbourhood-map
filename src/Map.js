/* global google */
import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import MapStyles from './MapStyles';

const locations =  [
  {title:"locationOne", position:{ lat: 44.4314812, lng: 26.0983232 }},
  {title:"locationTwo", position:{ lat: 44.431877, lng: 26.101609 }}
]

fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=44.4318595,26.0991834&radius=1500&type=museum&key=AIzaSyBB9mgpOXLSD2ds0Yl3okmuQaUcJkMNPuI')
.then(response => response.json())
.then(myJson => console.log(myJson));


const MapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: 44.4318595, lng: 26.0991834 }}
    defaultOptions={{ styles: MapStyles }}>
    {locations.map(location =>
      <Marker
        position={location.position}
        title={location.title}
        animation={google.maps.Animation.BOUNCE}
      />
    )}
  </GoogleMap>
))

export default MapComponent;
