/* global Materialize */
/* global $ */
import React, { PropTypes } from 'react';
import TextInput from '../common/TextInput';


/** @class CreateDocumentModal
 * @classdesc component for create document modal
 */
class LoginModal extends React.Component {
  /* eslint-disable Unexpected alert */

  /**
   * constructor - contains the constructor
   * @param  {type} props the properties of the class component
   * @param {object} context
   * @return {void} no return or void
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clearError = this.clearError.bind(this);
  }

  componentDidMount() {
    $('.modal-trigger').leanModal();
  }

  /**
   * onUsernameChange - handles the username event handler
   * @param  {object} event the event for the username field
   * @return {void} no return or void
   */
  onChange(event) {
    const invalid = false;
    this.setState({
      [event.target.name]: event.target.value,
      invalid
    });
  }
  /**
   * onSave - handles the onSave event handler
   * @param {object} event the event handler
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.loginRequest(this.state)
    .then(
      () => {
        Materialize.toast('Logged In Successfully', 1000, 'green',
      () => {
        $('#modal1').closeModal({ dismissible: true });
        $('.lean-overlay').css({ display: 'none' });
        $('.lean-overlay').remove();
        this.context.router.push('/dashboard');
      });
      },
    () => {
      const errors = {
        invalid: 'Invalid Credentials'
      };
      const invalid = true;
      this.setState({
        errors,
        invalid
      });
    });
  }
  /**
   * clearError - clears error when onFocus
   * @param  {object} event the event handler
   * @return {void} no returns or void
   */
  clearError() {
    let errors = this.state.errors;
    if (errors !== null) {
      errors = {};
      const invalid = false;
      this.setState({ errors, invalid });
    }
  }
  /**
   * render - renders the class component
   * @return {object} returns an object
   */
  render() {
    return (
  <div id="modal1" className="modal modalStyle">
    <main>
      <center>
        <div className="section" />
        <center>
          <h6>Welcome, Log in Your Account!</h6>
        </center>
        <form className="col s12" onSubmit={this.onSubmit} method="post">
          <div className="row">
            <div className="col s12" />
          </div>

          <div className="row">
            <TextInput
              className="input-field col m12 s12"
              type="text"
              name="username"
              id="username-login"
              onChange={this.onChange}
              onFocus={this.clearError}
              label="Username"
              required
            />
          </div>

          <div className="row">
            <TextInput
              className="input-field col m12 s12"
              type="password"
              name="password"
              id="password-login"
              onChange={this.onChange}
              onFocus={this.clearError}
              label="Enter your password"
              required
            />
          </div>

          <br />
          <center>
        <div className="row">
        <button
          type="submit"
          id="login-btn"
          name="btn_login"
          className="col s12 btn btn-large waves-effect light-reddish darken-3"
          disabled={this.state.invalid}
        >Login</button>
        </div>
      </center>
        </form>
            <a className="modal-action modal-close">Create An account</a>
          </center>
          <div className="section" />
          <div className="section" />
        </main>
      </div>);
  }
}
LoginModal.propTypes = {
  loginRequest: PropTypes.func.isRequired
};
LoginModal.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginModal;
