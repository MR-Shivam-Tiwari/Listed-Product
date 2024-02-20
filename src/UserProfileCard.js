// src/components/UserProfileCard.js
import React from 'react';

const UserProfileCard = ({ user }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card border-2">
        <div className='p-2  d-flex align-items-center'>
          <div>
            <img src={user.picture.large} alt="User" style={{ width: "120px", borderRadius: "5px" }} className="card-img-top ms-2 py-0 border" />
          </div>
          <div className="card-body">
            <h5 className="card-title">{`${user.name.first} ${user.name.last}`}</h5>
            <span className="card-text">{user.email}</span><br></br>
            <span className="card-text">Phone: {user.phone}</span> <br></br>
            <span className="card-text">Gender: {user.gender}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
