import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavBar from '../common/AdminNavBar';

import * as DocumentActions from '../../actions/DocumentAction';
import * as UserActions from '../../actions/UserAction';
import * as RoleActions from '../../actions/RolesAction';
import * as SearchActions from '../../actions/SearchActions';
import UsersTable from './users/UsersTable';
import UsersView from './users/UsersView';
import AddRoleModal from './users/AddRole';

class AdminPanel extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedUser: '',
      classValue: 'col s7 m12 l12 card-panel z-depth-1',
      display: false,
      searchQuery: '',
      searching: false
    };
    this.updateRole = this.updateRole.bind(this);
    this.changeView = this.changeView.bind(this);
    this.openModal = this.openModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
  }

  componentWillMount() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.props.actions.loadRoles();
      this.props.actions.loadUsers();
    }
  }

  componentDidMount() {
    $('select').material_select();
    $('.modal-trigger').leanModal();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user) {
      this.setState({
        searching: false
      });
    }
  }
  updateRole(selectedUser) {
    event.preventDefault();
    if (this.state.classValue === 'col s7 m12 l12 card-panel z-depth-1') {
      const classValue = 'col s7 m6 l6 card-panel z-depth-1';
      this.setState({
        selectedUser,
        display: true,
        classValue
      });
    } else {
      this.setState({
        selectedUser,
        display: true,
      });
    }
  }
  openModal() {
    $('#modal2').openModal({ dismissible: true });
  }
  onChange(event) {
    this.setState({
      searchQuery: event.target.value
    });
  }
  onSubmit(event) {
    event.preventDefault();
    const searchQuery = this.state.searchQuery,
      filtered = searchQuery.trim();
    if (!filtered) {
      Materialize.toast('Please type in a Keyword', 1000, 'red');
    } else {
      this.setState({
        searching: true
      });
      this.props.actions.searchUsers(searchQuery);
    }
  }
  changeView() {
    if (this.state.classValue === 'col s7 m6 l6 card-panel z-depth-1') {
      const classValue = 'col s7 m12 l12 card-panel z-depth-1';
      this.setState({
        selectedUser: '',
        display: false,
        classValue
      });
    } else {
      this.setState({
        selectedUser: '',
        display: false,
      });
    }
  }
  closeSearch() {
    this.setState({
      searching: false
    });
  }

  render() {
    const { user, allRoles, loggedInUser, searchedResult } = this.props;
    const {
      updateRole,
      loadUsers,
      deleteUser,
      addRole
    } = this.props.actions;
    let allUsers = user.allUsers;
    const { selectedUser, display, searching, searchQuery } = this.state;
    if (searching) {
      allUsers = searchedResult;
    }
    const filteredUsers = allUsers.filter((userDetails) => {
      return userDetails.id !== loggedInUser.id;
    });
    const nextRoleId = allRoles.length + 1;
    return (
    <div className="col m12 card-panel">
      <div id="email-list">
      <NavBar
      onSubmit={this.onSubmit}
      onChange={this.onChange}
      searching={searching}
      searchQuery={searchQuery}
      closeSearch={this.closeSearch}
      />
    {<UsersTable
      rows={filteredUsers}
      allRoles={allRoles}
      updateRole={this.updateRole}
      classValue={this.state.classValue}
      />}
    {
    display && selectedUser && <UsersView
    allRoles={allRoles}
    allUsers={allUsers}
    selectedUser={this.state.selectedUser}
    editRole={updateRole}
    updateRole={this.updateRole}
    loadUser={loadUsers}
    deleteUser={deleteUser}
    changeView={this.changeView}
    />
    }
      </div>
      <AddRoleModal
      nextRoleId={nextRoleId}
      addRole={addRole}
      />
      </div>
    );
  }
}
AdminPanel.propTypes = {
  user: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired,
  allRoles: React.PropTypes.array.isRequired,
  loggedInUser: React.PropTypes.object.isRequired,
  searchedResult: React.PropTypes.array.isRequired
};
/**
 * mapDispatchToProps - maps dispatch to props value
 * @param  {Function} dispatch dispatchs function
 * @return {Object} returns an Object
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign({},
      DocumentActions,
      RoleActions,
      SearchActions,
      UserActions), dispatch)
  };
}
/**
 * mapStateToProps - maps state value to props
 * @param  {object} state the store state
 * @param  {type} ownProps the component state
 * @return {Object} returns an object
 */
function mapStateToProps(state) {
  return {
    user: state.Users,
    allRoles: state.Roles.roles,
    loggedInUser: state.Auth.user,
    searchedResult: state.Search.searchedUsers
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
