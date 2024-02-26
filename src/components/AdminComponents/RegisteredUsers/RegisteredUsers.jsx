import React from "react";
import { useContext } from "react";
import { AdminPageAPIContext } from "../../../context/AdminPageAPIContext";
import "./RegisteredUsers.css";

const RegisteredUsers = () => {
  const { activeUsers } = useContext(AdminPageAPIContext);
  return (
    <div className="registered-users-container">
      <h2>Active Users</h2>

      <div className="registered-users">
        {activeUsers.map((user) => (
          <div key={user.email} className="card">
            <div className="registered-user">
              <p>
                <b>Email:</b> {user.email}
              </p><br />
              <p>
                <b>Phone:</b> {user.phone}
              </p><br />
              <p>
                <b>Password:</b> {user.password}
              </p><br />
              <p>
                <b>Role:</b> {user.role}
              </p><br />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisteredUsers;
