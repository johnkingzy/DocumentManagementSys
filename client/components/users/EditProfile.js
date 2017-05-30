/* global Materialize */
/* global $ */
import React, { PropTypes } from 'react';

import TextInput from '../common/TextInput';
/**
* @class EditProfile
* @classdesc signup form react component
*/
class EditProfile extends React.Component {

  /**
   * constructor - contains the class properties
   * @param  {object} props property value
   * @param {Object} context class context
   * @return {void} returns void or no return
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      userDetails: {
        firstname: props.userInfo.firstname,
        lastname: props.userInfo.lastname,
        username: props.userInfo.username,
        email: props.userInfo.email,
        password: '',
      },
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
    this.clearError = this.clearError.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  /**
   * onChange - onChange event for input field
   * @param  {object} event event property handler
   * @return {void} returns void or no return
   */
  onChange(event) {
    const field = [event.target.name];
    const userDetails = this.state.userDetails;
    userDetails[field] = event.target.value;
    this.setState({
      userDetails
    });
  }
  onConfirm(event) {
    const input = event.target.value;
    const errors = {};
    let invalid = false;
    const password = this.state.userDetails.password;
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
   * onSubmit - onSubmit event handler
   * @param  {object} event event property handler
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({
      errors: {}
    });
    const { errors, isValid } = this.validateUserInput(this.state.userDetails);
    if (!isValid) {
      this.props.editUser(this.props.userInfo.id, this.state.userDetails)
      .then(() => {
        Materialize.toast('Your details has been updated', 1000, 'green');
        this.props.isEditing();
        this.context.router.push('/');
      });
    } else {
      this.setState({
        errors
      });
    }
  }
  /**
   * checkUserExists - checks if user with details already exist
   * @param  {object} event the event handler
   * @return {void} no return or void
   */
  checkUserExists(event) {
    const field = event.target.name;
    const stateValue = this.state.userDetails[field];
    const value = event.target.value;
    if (value !== '' && value !== stateValue) {
      this
      .props
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
   * render - renders content to the view
   * @return {object} return an object
   */
  render() {
    const {
      username,
      firstname,
      lastname,
      email,
    } = this.state.userDetails;
    const { errors } = this.state;
    return (<form className="col s12" onSubmit={this.onSubmit} method="post">
      <div className="row">
        <div className="col s12" />
      </div>
      <div className="row">
        <TextInput
          type="text"
          className="input-field col m6 s12"
          name="firstname"
          id="firstname"
          onChange={this.onChange}
          error={errors.firstname}
          label="First Name"
          labelclass="active"
          value={firstname}
          required
        />
        <TextInput
          className="input-field col m6 s12"
          type="text"
          name="lastname"
          id="lastname"
          onChange={this.onChange}
          error={errors.lastname}
          label="Last Name"
          value={lastname}
          labelclass="active"
          required
        />
      </div>
      <div className="row">
        <TextInput
          className="input-field col m6 s12"
          type="text"
          name="username"
          id="username"
          onChange={this.onChange}
          error={errors.username}
          onBlur={this.checkUserExists}
          onFocus={this.clearError}
          value={username}
          label="Username"
          labelclass="active"
          required
        />
        <TextInput
          className="input-field col m6 s12"
          type="email"
          name="email"
          id="email"
          onChange={this.onChange}
          error={errors.email}
          onBlur={this.checkUserExists}
          onFocus={this.clearError}
          value={email}
          label="Email Address"
          labelclass="active"
          required
        />
      </div>
      <div className="row">
        <TextInput
          className="input-field col m6 s12"
          type="password"
          name="password"
          id="password"
          onChange={this.onChange}
          error={errors.password}
          onFocus={this.clearError}
          label="Password"
        />
        <TextInput
          className="input-field col m6 s12"
          type="password"
          name="confirm"
          id="confirm"
          onChange={this.onConfirm}
          error={errors.confirm}
          label="Confirm Password"
          required
        />
      </div>
      <center>
        <div className="row">
          <button
            type="submit"
            name="btn_login"
            className="col s12 btn btn-large waves-effect light-blue darken-3"
            disabled={this.state.invalid}
          > Update Account </button>
        </div>
      </center>
    </form>
    );
  }
}
EditProfile.contextTypes = {
  router: React.PropTypes.object.isRequired
};

EditProfile.propTypes = {
  editUser: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  isEditing: PropTypes.func.isRequired,
};
export default EditProfile;
