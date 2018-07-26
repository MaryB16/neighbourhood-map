import React from 'react';

/**
 * Creates an info window with venue information
 */
const InfoWindow = (props) => {
    return (
      <div aria-label={`${props.title} information`} className='info-window'>
        <h3>{props.title}</h3>
        <p tabIndex='0'>{`Street: ${props.address}`}</p>
        <a target='_blank' href={props.webAddress} rel='noreferrer noopener'>Click here for details</a>
      </div>
    )
}

export default InfoWindow;
