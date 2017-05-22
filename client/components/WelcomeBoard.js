import React from 'react';
import { connect } from 'react-redux';


class WelcomeBoard extends React.Component {
  render() {
    const { allDocuments, currentUserDetails } = this.props;
    const userId = currentUserDetails.user.id;
    const Public = allDocuments.filter((document) => {
      return document.access === 'public' && document.ownerId === userId;
    });
    const Private = allDocuments.filter((document) => {
      return document.access === 'private' && document.ownerId === userId;
    });
    const Role = allDocuments.filter((document) => {
      return document.access === 'role' && document.ownerId === userId;
    });
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
          <h4 className="card-title grey-text text-darken-4">
          { allDocuments && Public.length }</h4>
          <p className="medium-small grey-text">Public Documents</p>
      </div>
      <div className="col s2 center-align">
          <h4 className="card-title grey-text text-darken-4">
          { allDocuments && Private.length }
          </h4>
          <p className="medium-small grey-text">Private Documents</p>
      </div>
      <div className="col s2 center-align">
          <h4 className="card-title grey-text text-darken-4">
          { allDocuments && Role.length }
          </h4>
          <p className="medium-small grey-text">Private Documents</p>
      </div>
      <div className="col s1 right-align bar">
      <a
      className="btn-floating activator waves-effect waves-light darken-2 right"
      >
      <i className="orange mdi-action-perm-identity" />
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
WelcomeBoard.propTypes = {
  allDocuments: React.PropTypes.array.isRequired,
  currentUserDetails: React.PropTypes.object.isRequired,
};
/**
 * mapDispatchToProps - maps dispatch to props value
 * @param  {Function} dispatch dispatchs function
 * @return {Object} returns an Object
 */
// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(DocumentActions, dispatch)
//   };
// }
/**
 * mapStateToProps - maps state value to props
 * @param  {object} state the store state
 * @param  {type} ownProps the component state
 * @return {Object} returns an object
 */
function mapStateToProps(state) {
  let currentUserDetails;
  if (!state.Auth.user) {
    currentUserDetails = {
      user: {
        id: 0
      }
    };
  } else {
    currentUserDetails = state.Auth;
  }
  return {
    currentUserDetails,
  };
}
export default connect(mapStateToProps)(WelcomeBoard);
