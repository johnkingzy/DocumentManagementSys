import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as AuthActions from '../../actions/AuthAction';
import logo from '../../assets/img/data-logo.png';

/** @class NavigationBar
 * @classdesc contains links for the navigation bar
 */
class NavigationBar extends React.Component {

  /**
   * constructor - contains class properties
   * @param  {object} props the properties
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
    this.logout = this.logout.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  /**
   * logout - logout a user out
   * @param  {type} event the event handler
   * @return {void} no return or void
   */
  logout(event) {
    event.preventDefault();
    this.props.actions.logout();
    this.context.router.push('/');
  }
  redirect(path) {
    return browserHistory.push(path);
  }
  /**
   * render - renders the NavigationBar component
   * @return {object} contains the JSX code
   */
  render() {
    return (
      <nav className="light-reddish darken-3" id="navbar">
        <div classNameName="nav-wrapper">
          <a onClick={() => this.redirect('/')}>
            <img alt={logo} src={logo} className="logo" /></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a onClick={() => this.redirect('/')}>Home</a></li>
              <li><a onClick={() => this.redirect('/docs')}>View Docs</a></li>
            </ul>
        </div>
      </nav>
    );
  }
}
NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

NavigationBar.contextTypes = {
  router: PropTypes.object.isRequired
};

/**
 * mapStateToProps - maps the state to props
 * @param  {object} state the statefrom redux store
 * @return {void} no return or void
 */
function mapStateToProps(state) {
  return {
    auth: state.Auth
  };
}

/**
 * mapDispatchToProps - dispatch actions as props
 * @param  {Function} dispatch an actios
 * @return {object} returns an object
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
