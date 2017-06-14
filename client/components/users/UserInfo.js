import React, { PropTypes } from 'react';

class UserInfo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: props.userDetails
    };
  }

  render() {
    const {
      username,
      lastname,
      firstname,
      email
    } = this.props.userDetails;
    const { Public, Private, Role } = this.props;
    return (<div className="card-content">
    <i className="material-icons">account_circle</i>
    <span id="user">
    {firstname} {lastname}</span>
    <p className="small grey-text">Username:  @{username} </p>
    <p className="small grey-text">Email: {email} </p>
    <div className="row">
      <div className="col s4 center-align">
          <h4 className="card-title grey-text text-darken-4">
          { Public.length }</h4>
          <p className="medium-small grey-text">Public Documents</p>
      </div>
      <div className="col s4 center-align">
          <h4 className="card-title grey-text text-darken-4">
          { Private.length }
          </h4>
          <p className="medium-small grey-text">Private Documents</p>
      </div>
      <div className="col s4 center-align">
          <h4 className="card-title grey-text text-darken-4">
          { Role.length }
          </h4>
          <p className="medium-small grey-text">Role Documents</p>
      </div>
    </div>
    </div>);
  }
}
UserInfo.propTypes = {
  userDetails: PropTypes.object.isRequired,
  Public: PropTypes.array.isRequired,
  Private: PropTypes.array.isRequired,
  Role: PropTypes.array.isRequired,
};
export default UserInfo;
