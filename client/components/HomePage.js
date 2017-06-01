import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginModal from './authentication/LoginModal';
import SignUpForm from './authentication/SignUpForm';
import * as AuthActions from '../actions/AuthAction';
import NavigationBar from './includes/Navigation';



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
    return (
      <div>
      <NavigationBar />
    <center>
      <div className="container">
        <div className="z-depth-1 grey lighten-4 row" id="authentication">
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
    </center></div>);
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
    actions: bindActionCreators(AuthActions, dispatch)
  };
}
HomePage.propTypes = {
  actions: PropTypes.object.isRequired
};
// const mapDispatchToProps = (dispatch => ({ actions:
// bindActionCreators(AuthActions, dispatch) }));
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
