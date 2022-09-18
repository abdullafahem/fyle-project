import React, { useState, useEffect } from "react";
import axios from "axios";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const options = {
      method: "GET",
      url: `${process.env.BASE_URL}/johnpapa`,
      headers: {
        "User-Agent": "request",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const userRes = response.data;

        setUser(userRes);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <div className='row'>
        <div className='col-md-4'>
          <img
            className='rounded-circle w-50 float-start '
            src={user.avatar_url}
            alt={user.name}
          />
        </div>
        <div className='col-md-8'>
          <h1>{user.name}</h1>
          <p></p>
          <p><i class="fa-solid fa-location-dot"></i> {user.location}</p>
          <p>Twitter: {user.twitter_username}</p>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-md-12'>
          <p>{user.html_url}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
