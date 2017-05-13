import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import logo from '../assets/img/data-logo1.png';
import LoginModal from './authentication/LoginModal';
import SignUpForm from './authentication/SignUpForm';
import * as SignUpActions from '../actions/SignUpAction';


/**
* @class InvertedIndex
* @classdesc containing the InvertedIndex methods
*/
class HomePage extends React.Component {

  /**
   * constructor - contains class properties
   * @param {object} props properties of class
   * @return {void} no return or void
   */
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  /**
   * toggleModal - its use to toggel the modal
   * @return {void} no return or void
   */
  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  /**
   * render - renders class component
   * @return {object}  the jsx content
   */
  render() {
    const { saveUserDetails, isUserExists, loginRequest } = this.props.actions;
    return (<center>
      <div className="container">
        <div className="z-depth-1 grey lighten-4 row" id="authentication">
          <img alt={logo} className="responsive-img logo" src={logo} />
          <SignUpForm
            saveUserDetails={saveUserDetails}
            isUserExists={isUserExists}
          />
        </div>
      </div>
      <LoginModal
        show={this.state.isOpen}
        onClose={this.toggleModal}
        loginRequest={loginRequest}
      >
        Heres some content for the modal
      </LoginModal>
    </center>);
  }
}
const mapStateToProps = (state => ({
  userDetails: state
}));

/**
 * mapDispatchToProps - description
 * @param  {type} dispatch description
 * @return {type}          description
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SignUpActions, dispatch)
  };
}
HomePage.propTypes = {
  actions: PropTypes.object.isRequired
};
// const mapDispatchToProps = (dispatch => ({ actions:
// bindActionCreators(SignUpActions, dispatch) }));
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
