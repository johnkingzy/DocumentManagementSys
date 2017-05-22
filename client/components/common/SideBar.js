import React from 'react';


/**
 * SideBar - sidebar component
 * @return {XML} returns JSX Code
 */
export default function SideBar() {
  return (
    <div id="email-sidebar" className="col s2 m1 s1 card-panel">
    <ul>
    <li>
      <img
      src="client/assets/img/image2.png"
      alt="" className="circle responsive-img valign profile-image" />
    </li>
    <li>
      <a href="#!"><i className="material-icons">folder_shared</i>
      <p>Dashboard</p>
      </a>
    </li>
    <li>
      <a href="#!"><i className="material-icons responsive-img">widgets</i></a>
    </li>
    <li width="100px" height="100px">
      <a href="#!"><i className="material-icons">search</i></a>
    </li>
    <li>
      <a href="#!"><i className="material-icons">person</i></a>
    </li>
    <li>
      <a href="#!"><i className="material-icons">file_download</i></a>
    </li>
    <li>
      <a href="#!"><i className="material-icons">settings</i></a>
  </li>
  <li>
      <a href="#!"><i className="material-icons">verified_user</i></a>
  </li>
  </ul>
    </div>
  );
}
