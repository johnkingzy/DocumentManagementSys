import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EditProfile from './users/EditProfile';
import UserInfo from './users/UserInfo';
import * as UserActions from '../actions/UserAction';
import * as AuthActions from '../actions/AuthAction';


class WelcomeBoard extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editProfile: false,
      user: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        errors: {},
      },
      errors: {}
    };
    this.isEditing = this.isEditing.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
    this.clearError = this.clearError.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }
  isEditing() {
    const activeUser = this.props.activeUser;
    const user = this.state.user;
    user.email = activeUser.email;
    user.firstname = activeUser.firstname;
    user.lastname = activeUser.lastname;
    user.username = activeUser.username;
    this.setState({
      editProfile: !this.state.editProfile,
      user
    });
  }
  /**
   * onSubmit - onSubmit event handler
   * @param  {object} event event property handler
   */
  onSave(event) {
    event.preventDefault();
    this.setState({
      errors: {}
    });
    const { errors, isValid } = this.validateUserInput(this.state.user);
    if (!isValid) {
      this.props.actions.editUser(this.props.activeUser.id, this.state.user)
      .then(() => {
        Materialize.toast('Your details has been updated', 1000, 'green');
        this.isEditing();
        this.context.router.push('/');
      });
    } else {
      this.setState({
        errors
      });
    }
  }
   /**
   * clearError - clears error when onFocus
   * @param  {object} event the event handler
   * @return {void} no returns or void
   */
  clearError(event) {
    const field = event.target.name;
    const errors = this.state.errors;
    if (errors[field] !== null) {
      errors[field] = '';
      const invalid = false;
      this.setState({ errors, invalid });
    }
  }
  /**
   * checkUserExists - checks if user with details already exist
   * @param  {object} event the event handler
   * @return {void} no return or void
   */
  checkUserExists(event) {
    const field = event.target.name;
    const value = event.target.value;
    const currentDetail = this.props.activeUser[field];
    console.log(currentDetail, 'hello my code');
    if (value !== '' && value !== currentDetail) {
      this
      .props
      .actions
      .isUserExists(value)
      .then((res) => {
        const errors = this.state.errors;
        let invalid;
        if (res.data.user) {
          errors[field] = `${field} already exists`;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  }
  onConfirm(event) {
    const input = event.target.value;
    const errors = {};
    let invalid = false;
    const password = this.state.user.password;
    if (input !== password) {
      errors.confirm = 'Password do not match';
      invalid = true;
    }
    this.setState({
      errors,
      invalid
    });
  }
  /**
   * validateUserInput - validate users input
   * @param  {Object} state contains the user details
   * @return {Boolean} returns true or false
   */
  validateUserInput(state) {
    const errors = {};
    let isValid = false;
    const regexp = /\S+@\S+\.\S+/;
    if (!(regexp.test(state.email))) {
      errors.email = 'Please Enter a valid email address';
    }
    if (!(state.username.length >= 5)) {
      errors.username = 'Username must have a minimum of 5 characters';
    }
    if (!(state.password.length >= 8)) {
      errors.password = 'Password should have a minimum of 8 characters';
    }
    if (Object.keys(errors).length !== 0) {
      isValid = true;
    }
    return {
      errors,
      isValid
    };
  }
   /**
   * onChange - onChange event for input field
   * @param  {object} event event property handler
   * @return {void} returns void or no return
   */
  onChange(event) {
    const field = [event.target.name];
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({
      user
    });
    // console.log(field);
  }

  render() {
    const { allDocuments,
      currentUserDetails,
      activeUser } = this.props;
    const activeUserLength = Object.keys(activeUser).length;
    const userId = currentUserDetails.user.id;
    const { editProfile, errors } = this.state; 
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
  <div id="profile-page-header" className="card">
    {activeUser && activeUserLength > 0 &&
    <UserInfo
    userDetails={activeUser}
    Public={Public}
    Private={Private}
    Role={Role}
    />}
    </div>
     <table id="useredit" className="striped">
        <thead>
          <tr>
            <th data-field="id">User Details</th>
            <th
            className="right"
            data-field="name">
            <a onClick={this.isEditing}>
              Edit Profile
              </a>
              </th>
          </tr>
        </thead>
        {editProfile ?
        <EditProfile
        userDetail={this.state.user}
        onChange={this.onChange}
        onSave={this.onSave}
        errors={errors}
        checkUserExists={this.checkUserExists}
        clearError={this.clearError}
        invalid={this.state.invalid}
        onConfirm={this.onConfirm}
        />
        :
        <tbody>
          <tr>
            <td>First Name</td>
            <td>{activeUser.firstname}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{activeUser.lastname}</td>
          </tr>
          <tr>
            <td>Username</td>
            <td>{activeUser.username}</td>
          </tr>
          <tr>
            <td>Email Address</td>
            <td>{activeUser.email}</td>
          </tr>
          <tr>
            <td>Password</td>
            <td>
              &#8226;
              &#8226;
              &#8226;
              &#8226;
              &#8226;
              &#8226;
              &#8226;
              </td>
          </tr>
        </tbody>}
      </table>
    </div>
    );
  }
}
WelcomeBoard.propTypes = {
  allDocuments: React.PropTypes.array.isRequired,
  currentUserDetails: React.PropTypes.object.isRequired,
  openDocument: React.PropTypes.func.isRequired,
  actions: React.PropTypes.object.isRequired,
  activeUser: React.PropTypes.object.isRequired
};
/**
 * mapDispatchToProps - maps dispatch to props value
 * @param  {Function} dispatch dispatchs function
 * @return {Object} returns an Object
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign({}, UserActions, AuthActions), dispatch)
  };
}
/**
 * mapStateToProps - maps state value to props
 * @param  {object} state the store state
 * @param  {type} ownProps the component state
 * @return {Object} returns an object
 */
function mapStateToProps(state) {
  let currentUserDetails;
  const loggedInUser = state.Users;
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
    loggedInUser
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(WelcomeBoard);
