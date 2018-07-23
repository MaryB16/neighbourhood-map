import React, {Component} from 'react';

class FilterMenu extends Component {

  message = (venue) => {
    console.log("I have clicked " + venue.name)
    console.log("I have clicked " + venue.id)

}

  render() {
    const {venues, markers} = this.props;
    console.error("I am filter")
    console.log(venues)
    console.log(markers)

    return (
      <div className='filter-menu'>
        {venues.map(venue=>
          <div key ={venue.id} className='venue'  onClick={() => this.message(venue)}>
            {venue.name}
          </div>
        )}
      </div>
    )
  }
}

export default FilterMenu;
