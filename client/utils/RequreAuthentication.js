import React, { PropTypes } from 'react';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SignupActions from '../actions/AuthAction';

dotenv.config();
const key = process.env.SECRET_KEY || 'maximuf';

/**
 *
 *
 * @export
 * @param {any} ComposedComponent
 * @returns {any}
 */
export default function (ComposedComponent) {
  class Authenticate extends React.Component {

    componentWillMount() {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        jwt.verify(token, key, (error) => {
          if (error) {
            this.props.actions.logout();
            this
              .context
              .router
              .push('/login');
          }
        });
      } else if (!this.props.isAuthenticated) {
        this
          .context
          .router
          .push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this
          .context
          .router
          .push('/login');
      }
    }
    render() {
      return (<ComposedComponent {...this.props}/>);
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
  };

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired
  };
  /**
   * mapDispatchToProps - maps dispatch to props value
   * @param  {Function} dispatch dispatchs function
   * @return {Object} returns an Object
   */
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(SignupActions, dispatch)
    };
  }

/**
 *
 *
 * @param {any} state
 * @returns {boolean}
 */
  function mapStateToProps(state) {
    let isAuthenticated;
    if (state.Auth.isAuthenticated) {
      isAuthenticated = state.Auth.isAuthenticated;
    } else {
      isAuthenticated = false;
    }
    return { isAuthenticated };
  }

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
