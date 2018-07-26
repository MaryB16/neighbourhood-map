import React, {Component} from 'react';
/*global google*/

/**
 * Component used to filter map venues and markers
 */
class FilterMenu extends Component {

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({
      query:query
    });
  }

  /**
   * Opens the info window for a specific venue
   */
  openInfoWindow = (venue) => {
    this.props.markers.forEach((marker) => {
      if (venue.id === marker.id)
        google.maps.event.trigger(marker, 'click');
    });
  }

  /**
   * Returns a list of venues that match the given query
   */
  getFilteredVenues = (query) => {
    const {venues, markers} = this.props;

    if(query) {
      markers.forEach(marker => {
        let shouldMarkerBeVisible = marker.title.toLowerCase().includes(query.toLowerCase());
        marker.setVisible(shouldMarkerBeVisible);
      });
      return venues.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase()));
    }
    else return venues;
  }

  render() {
    const {query} = this.state;
    const filteredVenues = this.getFilteredVenues(query)

    return (
      <div className='filter-menu'>
        <div  className='user-input'>
          <input
            type='text'
            placeholder='Search coffee shop'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value) }
          />
        </div>
          {filteredVenues.map(venue =>
            <div tabIndex='0' role='listitem' key={venue.id} className='venue' onClick={() => this.openInfoWindow(venue)}>
              {venue.name}
            </div>
          )}
        </div>
      )
  }
}

export default FilterMenu;
