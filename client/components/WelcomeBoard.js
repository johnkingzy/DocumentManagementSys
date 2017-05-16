import React from 'react';

export default class WelcomePage extends React.Component {
  render() {
    return (
  <div id="email-details" className="col s12 m7 l7 card-panel">
  <div id="profile-page" className="section">
  <div id="profile-page-header" className="card">
  <div className="card-content">
    <div className="row">
      <div className="col s4">
          <h4 className="card-title grey-text text-darken-4" />
          <center>
          <img
          src="client/assets/img/avatar.jpg"
          alt="profile image"
          className="circle z-depth-2 responsive-img activator" />
          </center>
          <p className="medium-small grey-text center">
          Maximuf</p>
      </div>
      <div className="col s2 center-align">
          <h4 className="card-title grey-text text-darken-4">10</h4>
          <p className="medium-small grey-text">Public Documents</p>
      </div>
      <div className="col s2 center-align">
          <h4 className="card-title grey-text text-darken-4">6</h4>
          <p className="medium-small grey-text">Private Documents</p>
      </div>
      <div className="col s2 center-align">
          <h4 className="card-title grey-text text-darken-4">6</h4>
          <p className="medium-small grey-text">Private Documents</p>
      </div>
      <div className="col s1 right-align bar">
      <a
      className="btn-floating activator waves-effect waves-light darken-2 right"
      >
      <i className="mdi-action-perm-identity" />
        </a>
      </div>
    </div>
    </div>
    <div className="card-reveal">
        <p>
        <span className="card-title grey-text text-darken-4">
        Roger Waters
        <i className="mdi-navigation-close right" /></span>
        <span>
        <i className="mdi-action-perm-identity cyan-text text-darken-2" />
        Project Manager</span>
      </p>
      <p>I am a very simple </p>
        </div>
    </div>
    </div>
  </div>
    );
  }
}
