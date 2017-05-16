/* global Materialize */
/* global $ */
import React from 'react';


/** @class CreateDocumentModal
 * @classdesc component for create document modal
 */
class LoginModal extends React.Component {
  /* eslint-disable Unexpected alert */

  /**
   * constructor - contains the constructor
   * @param  {type} props the properties of the class component
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
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
    this.setState({
      [event.target.name]: event.target.value
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
      Materialize.toast('Invalid Credentials', 2000, 'red');
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
            <div className="input-field col s12">
              <input
                className="validate"
                type="text"
                name="username"
                id="username"
                onChange={this.onChange}
                onFocus={this.clearError}
                required
              />
              <label htmlFor="username">Enter your username</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                type="password"
                name="password"
                id="password"
                onChange={this.onChange}
                onFocus={this.clearError}
              />
              <label htmlFor="password">Enter your password</label>
            </div>
            <span
              id="right"
            >
              <a className="orange-text" href="#!">
              <b>Forgot Password?</b></a>
            </span>
          </div>

          <br />
          <center>
        <div className="row">
          <button
            type="submit"
            name="btn_login"
            className="col s12 btn btn-large waves-effect light-blue darken-3"
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
  loginRequest: React.PropTypes.func.isRequired
};
LoginModal.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default LoginModal;
