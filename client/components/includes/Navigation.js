import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import signUpActions from '../../actions/SignUpAction';
import searchActions from '../../actions/searchActions';

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
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * logout - logout a user out
   * @param  {type} event the event handler
   * @return {void} no return or void
   */
  logout(event) {
    event.preventDefault();
    this.props.logout();
    this.context.router.push('/');
  }
  onSubmit(event) {
    event.preventDefault();
    console.log(this.state.search);
  }
  onChange(event) {
    const field = event.target.name;
    const state = this.state;
    state[field] = event.target.value;
    return this.setState({
      state
    });
  }
  /**
   * render - renders the NavigationBar component
   * @return {object} contains the JSX code
   */
  render() {
    const { isAuthenticated } = this.props.auth;
    const userLinks = (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <form onSubmit={this.onSubmit} className="form-wrapper cf col s5 m5">
              <input
              className="col s8 m8"
              type="text"
              placeholder="Type Keyword here..."
              name="search"
              onChange={this.onChange}
              required />
              <button
              id="search"
              className="waves-effect waves-light light-blue btn col s4 m4"
              type="submit">
              Search</button>
          </form>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/docs">View Docs</Link></li>
        <li><a href="" onClick={this.logout}>Logout</a></li>
      </ul>
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
  logout: React.PropTypes.func.isRequired,
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

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionsCreators(searchActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
