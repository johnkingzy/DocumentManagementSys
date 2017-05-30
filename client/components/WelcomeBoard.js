import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DisplayDocument from './documents/DisplayDocument';
import EditProfile from './users/EditProfile';
import UserInfo from './users/UserInfo';
import * as UserActions from '../actions/UserAction';
import * as AuthActions from '../actions/AuthAction';


class WelcomeBoard extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editProfile: false,
      loggedInUser: {}
    };
    this.isEditing = this.isEditing.bind(this);
  }
  componentWillMount() {
    const userId = this.props.currentUserDetails.user.id;
    this.props.actions.fetchUsers(userId).then(() => {
    });
  }
  isEditing() {
    this.setState({
      editProfile: !this.state.editProfile
    });
  }

  render() {
    const { allDocuments,
      currentUserDetails,
      openDocument,
      loggedInUser } = this.props;
    const { editUser, isUserExists } = this.props.actions;
    const userId = currentUserDetails.user.id;
    const editProfile = this.state.editProfile;
    const Public = allDocuments.filter((document) => {
      return document.access === 'public' && document.ownerId === userId;
    });
    const Private = allDocuments.filter((document) => {
      return document.access === 'private' && document.ownerId === userId;
    });
    const Role = allDocuments.filter((document) => {
      return document.access === 'role' && document.ownerId === userId;
    });
    return (
  <div id="email-details" className="col s12 m7 l7 card-panel">
  <div id="profile-page-header" className="card">
    </div>
     {allDocuments.length < 1 ?
     <h3>You have no Document</h3> :
     <div><nav className="data-nav light-blue">
              <div className="nav-wrapper">
              <ul className="data-section center">
                <span>My Documents </span>
                </ul>
                </div>
            </nav>
            <ul className="collection">
            {allDocuments &&
            allDocuments.map((document) => {
              if (document.ownerId === userId) {
                return (<DisplayDocument
                document={document}
                key={document.id}
                viewDocument={openDocument}
                profile="true"
                />);
              }
            })
            }
            </ul></div>}
    </div>
    );
  }
}
WelcomeBoard.propTypes = {
  allDocuments: React.PropTypes.array.isRequired,
  currentUserDetails: React.PropTypes.object.isRequired,
  openDocument: React.PropTypes.func.isRequired,
  actions: React.PropTypes.object.isRequired,
  loggedInUser: React.PropTypes.object.isRequired
};
/**
 * mapDispatchToProps - maps dispatch to props value
 * @param  {Function} dispatch dispatchs function
 * @return {Object} returns an Object
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign({}, UserActions, AuthActions), dispatch)
  };
}
/**
 * mapStateToProps - maps state value to props
 * @param  {object} state the store state
 * @param  {type} ownProps the component state
 * @return {Object} returns an object
 */
function mapStateToProps(state) {
  let currentUserDetails;
  const loggedInUser = state.Users.authUser;
  if (!state.Auth.user) {
    currentUserDetails = {
      user: {
        id: 0
      }
    };
  } else {
    currentUserDetails = state.Auth;
  }
  return {
    currentUserDetails,
    loggedInUser
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(WelcomeBoard);
