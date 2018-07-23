import React, {Component} from 'react';
/*global google*/
class FilterMenu extends Component {

  openInfoWindow = (venue) => {
    this.props.markers.forEach((marker,index) => {
    if(venue.id=== marker.id)  google.maps.event.trigger(this.props.markers[index], 'click')
  })
}

  render() {
    const {venues, markers} = this.props;
    console.error("I am filter")
    console.log(venues)
    console.log(markers)

    return (
      <div className='filter-menu'>
        {venues.map(venue=>
          <div key ={venue.id} className='venue'  onClick={() => this.openInfoWindow(venue)}>
            {venue.name}
          </div>
        )}
      </div>
    )
  }
}

export default FilterMenu;
