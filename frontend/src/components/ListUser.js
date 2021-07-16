import React from "react";
import "../styles/ListUser.css";

/**
 * 
 * @param {Object} param0 Data received from the API
 * @param {Function} param1 Function to delete a user
 * @returns Component with rendered list of users
 */
export default function ListUser({ username, handleDelete }) {
  const users = []; //Array where users are going to be stored

  for (let i = 0; i < username.length; i++) {
    users.push(
      <li key={username[i]._id}>
        <span>Usuario</span><p>{username[i].username}</p>
        <button onClick={() => handleDelete(username[i]._id)}>Eliminar</button>
      </li>
    );
  }

  return <ul className="ul--box">{users}</ul>;
}
