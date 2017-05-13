import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


/**
 * redirectUser - Authenticate a user
 * @param  {XML} composedComponent component to authenticate
 * @return {void} no return or void
 */
export default function redirectUser(composedComponent) {
    /** @class Authentication
     * @classdesc - checks if a user is logged in
     */
  class Authentication extends React.Component {
    /**
     * componentWillMount - performs action before component is render
     * @return {void} no return or void
     */
    componentWillMount() {
      if (this.props.isAuthenticated) {
        this.context.router.push('/dashboard');
      } else {
        this.context.router.push('/');
      }
    }

    /**
     * componentWillUpdate - performs action when component is updated
     * @param  {object} nextProps next props value
     * @return {void} no return or void
     */
    componentWillUpdate(nextProps) {
      if (nextProps.isAuthenticated) {
        this.context.router.push('/dashboard');
      } else {
        this.context.router.push('/');
      }
    }
    /**
     * render - renders class components
     * @return {XML} returns XML
     */
    render() {
      return (
        <composedComponent {...this.props} />
      );
    }
    }

  /**
   * mapStatetoProps - maps state to props value
   * @param  {type} state store state
   * @return {objetc} returns isAuthenticated state
   */
  function mapStatetoProps(state) {
    return {
      isAuthenticated: state.Auth.isAuthenticated
    };
  }
  Authentication.contextTypes = {
    router: PropTypes.objectOf(PropTypes.string).isRequired
  };
  Authentication.propTypes = {
    isAuthenticated: PropTypes.objectOf(PropTypes.string).isRequired
  };
  return connect(mapStatetoProps)(Authentication);
}
