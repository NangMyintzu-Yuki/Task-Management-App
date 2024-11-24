import React from 'react';
import '../css/sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <a href="/">
          <li>
            Dashboard
          </li>
        </a>
        <a href="/tasks">
          <li>
            Tasks
          </li>
        </a>
         <a href="/setting">
          <li>
            Setting
          </li>
        </a>
         <a href="/logout">
          <li>
            Logout
          </li>
        </a>
        

      </ul>
    </div>
  );
};

export default Sidebar;
