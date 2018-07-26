import React from 'react';

const InfoWindow = (props) => {
    return (
      <div tabIndex='0' aria-label={`${props.title} information`} className='info-window'>
        <h3>{props.title}</h3>
        <p tabIndex='0'>{`Street: ${props.address}`}</p>
        <a target='_blank' href={props.webAddress} rel='noreferrer noopener'>Click here for details</a>
      </div>
    )
}

export default InfoWindow;
