import React from 'react';

const UserDetails = (props) => {
  return (
    <div>
      <div className='row'>
        <div className='col-md-4'>
          <img
            className='rounded-circle w-50 float-start '
            src={props.user.avatar_url}
            alt={props.user.login}
          />
        </div>
        <div className='col-md-8'>
          <h1>{props.user.login}</h1>
          <p></p>
          <p>
            <i className='fa-solid fa-location-dot'></i> {props.user.location}
          </p>
          <p>Twitter: {props.user.twitter_username}</p>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-md-12'>
          <p>{props.user.html_url}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
