import React from 'react';
import setRole from '../../../utils/setRole';

class UsersTable extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      role: ''
    };
    this.updateRole = this.updateRole.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount() {
  // $('#access').on('change', this.updateRole);
  }
  updateRole(event) {
    const field = event.target.name;
    const data = this.state;
    data[field] = event.target.id;
    return this.setState({
      data
    });
  }
  onClick(event) {
    const selectedUser = event.target.id;
    this.props.updateRole(selectedUser);
  }

  render() {
    const { rows, classValue, allRoles } = this.props;
    const usersTable = (
        <table>
        <thead>
          <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Email Address</th>
              <th>RoleId</th>
              <th>Actions</th>
          </tr>
        </thead>
          {rows.map((row) => {
            return (
            <tbody key={row.id}>
            <tr>
            <td>{row.id}</td>
            <td>{row.firstname}</td>
            <td>{row.lastname}</td>
            <td>{row.username}</td>
            <td>{row.email}</td>
            <td>{setRole.users(row.roleId, allRoles)}
            </td>
            <td>
           <a
           onClick={this.onClick}
           className="btn-floating waves-effect waves-light orange">
           <i id={row.id} className="material-icons">create</i></a>
            </td>
          </tr></tbody>);
          }
          )}
      </table>
    );
    return (
      <div className={classValue}>
      { rows && rows.length > 0 ? usersTable :
      <center>No Result Found</center>}
      </div>
    );
  }
}
UsersTable.propTypes = {
  rows: React.PropTypes.array.isRequired,
  classValue: React.PropTypes.string.isRequired,
  updateRole: React.PropTypes.func.isRequired,
  allRoles: React.PropTypes.array.isRequired
};
export default UsersTable;
