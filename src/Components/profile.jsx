import React from "react";
import auth from "../services/authService";

const Profile = props => {
  const user = auth.getCurrentUser();

  return (
    <div className="row">
      <div className="col col-centered col-sm-6">
        <div className="card text-center">
          <div className="card-header">
            {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
          </div>
          <div className="card-body">
            <p className="card-title">Email: {user.email}</p>
            <p>Privileges: {user.isAdmin ? "Admin" : "Normal User"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
