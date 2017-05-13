import React from 'react';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SignupActions from '../actions/SignUpAction';

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
      jwt.verify(token, key, (error, decoded) => {
        if (error) {
          this.props.actions.logout();
          this
            .context
            .router
            .push('/login');
        }
      });
      if (!this.props.isAuthenticated) {
        this
          .context
          .router
          .push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.actions.logout();
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
    isAuthenticated: React.PropTypes.bool.isRequired,
    actions: React.PropTypes.object.isRequired
  };

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  };

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
    return { isAuthenticated: state.Auth.isAuthenticated };
  }

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
