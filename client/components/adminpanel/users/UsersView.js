import React, { PropTypes } from 'react';
import { getFirstLetter } from '../../../utils/helper';
import setRole from '../../../utils/setRole';

class UsersView extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      currentUser: {
        userId: '',
        role: ''
      },
      isEditing: false,
      allRole: props.allRoles,
      roleId: ''
    };
    this.onChange = this.onChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  componentDidMount() {
    $('select').material_select();
  }

  componentWillReceiveProps() {
    this.setState({
      isEditing: false,
    });
  }

  onChange(event) {
    const roleId = event.target.value;
    this.setState({
      roleId
    });
  }
  toggleEdit(roleId) {
    this.setState({
      isEditing: !this.state.isEditing,
      roleId
    });
  }
  onSubmit(event) {
    event.preventDefault();
    const userDetails = {
      roleId: this.state.roleId
    };
    this.props.editRole(userDetails, this.props.selectedUser)
    .then(() => {
      this.toggleEdit();
      Materialize.toast('user role was updated successfully', 1000, 'green',
          () => {
            this.props.loadUser();
          });
    });
  }
  onDelete(userId) {
    this.props.deleteUser(userId)
    .then(() => {
      Materialize.toast('User was deleted successfully', 1000, 'green',
          () => {
            this.props.loadUser();
            this.props.changeView();
          });
    });
  }

  render() {
    const { allRoles, allUsers, selectedUser } = this.props;
    const userDetails = allUsers.filter((user) => {
      return user.id === parseInt(selectedUser, 10);
    });
    const currentUser = userDetails[0];
    const { isEditing, roleId } = this.state;
    return (
      <div id="side-panel" className="col s6 m3 l3 card-panel">
        <div className="grey-text text-lighten-2">
        <div className="email-content-wrap">
          <div className="row">
            <div className="col s12 m12 l12">
              <ul className="collection">
                <li className="collection-item avatar">
                  <span id="avatar" className="circle blue darken-1">
                      {getFirstLetter(currentUser.username)}
                  </span>
                  <span className="black-text">
                    {currentUser.firstname} {currentUser.lastname}
                    <ul className="data-section right">
                  <li>
                  <a
                  className="red-text"
                  onClick={this.props.changeView}
                  >
                  <i className="material-icons right">clear</i>
                  </a>
                  </li>
                </ul>
                  </span>
                  <p className="truncate grey-text ultra-small">
                    {currentUser.email}</p>
                  <p className="grey-text ultra-small">
                    @{currentUser.username}</p>
                  <p className="grey-text ultra-small">
                  <span>Role: {setRole.users(currentUser.roleId, allRoles)}
                  </span>
                  </p>
                  </li>
              </ul>
            </div>
                  <div className="col s12 m12">
                  <button
                    id="change-role"
                    onClick={() => this.toggleEdit(currentUser.roleId)}
                    className="btn btn-default col s3 m3 save"
                    type="submit">Change Role</button>
                  <button
                    id="delete-user"
                    onClick={() => this.onDelete(currentUser.id)}
                    className="btn red col s3 m3 btn-default save "
                    type="submit">Delete User</button>
                    </div>
          </div>
          <div className="email-title">
            {isEditing &&
              <form id="roles" onSubmit={this.onSubmit} method="post">
              <div className="input-field col s12">
            {allRoles && allRoles.map((role, index) => {
              return (
                <p key={index}><input
                  name="role"
                  type="radio"
                  value={role.id}
                  onChange={this.onChange}
                  id={role.title}
                  checked={role.id === parseInt(roleId, 10)}
                   />
                  <label
                  htmlFor={role.title}>
                  {role.title}
                  </label></p>);
            })}
          </div>
          <br />
          <br />
          <br />
              <button
              id="save-it"
              className="btn btn-default save"
              type="submit">Save</button>
            </form>
            }
          </div>
        </div>
        </div>
      </div>
    );
  }
}
UsersView.propTypes = {
  allRoles: PropTypes.array.isRequired,
  allUsers: PropTypes.array.isRequired,
  selectedUser: PropTypes.string.isRequired,
  loadUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  editRole: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired
};
export default UsersView;
