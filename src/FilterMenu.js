import React, {Component} from 'react';
/*global google*/

class FilterMenu extends Component {

  state = {
    query:''
  }

  updateQuery =(query) => {
    this.setState({query:query})
  }

  openInfoWindow =(venue) => {
    this.props.markers.forEach((marker, index) => {
      if (venue.id === marker.id)
        google.maps.event.trigger(this.props.markers[index], 'click')
    })
  }

  render() {
    const {venues, markers} = this.props;
    const {query} = this.state;
    let filteredVenues =[];
    if(query) {
      filteredVenues = venues.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase()))
      markers.forEach(marker => {
        let shouldMarkerBeVisible = marker.title.toLowerCase().includes(query.toLowerCase());
        marker.setVisible(shouldMarkerBeVisible)
      })
      console.log(filteredVenues)
    }
    else filteredVenues = venues;

    return (<div className='filter-menu'>
      <div  className='user-input'>
        <input
          type="text"
          placeholder="Search coffee shop"
          value={this.state.query}
          onChange={(event) => this.updateQuery(event.target.value) }
        />
      </div>
      {filteredVenues.map(venue => <div  tabIndex="0" key={venue.id} className='venue' onClick={() => this.openInfoWindow(venue)}>
        {venue.name}
      </div>
      )}
    </div>)
  }
}

export default FilterMenu;
