import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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
  /**
   * render - renders the NavigationBar component
   * @return {object} contains the JSX code
   */
  render() {
    const { isAuthenticated } = this.props.auth;
    const userLinks = (
  <div>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/docs">View Docs</Link></li>
        <li><a href="" onClick={this.logout}>Logout</a></li>
      </ul>
      </div>
    );
    const guestLinks = (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/docs">View Docs</Link></li>
      </ul>
    );
    return (
      <nav className="light-reddish darken-3" id="navbar">
        <div classNameName="nav-wrapper">
          <Link to="#" className="brand-logo">
            <img alt={logo} src={logo} className="logo" /></Link>
          { isAuthenticated ? userLinks : guestLinks }
        </div>
      </nav>
    );
  }
}
NavigationBar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired,
};

NavigationBar.contextTypes = {
  router: React.PropTypes.object.isRequired
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
