import React, { PropTypes } from 'react';
import { Pagination } from 'react-materialize';
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
  /**
   * updateRole - updates roles
   * @param  {Object} event the event handler
   * @return {void} no return
   */
  updateRole(event) {
    const field = event.target.name;
    const data = this.state;
    data[field] = event.target.id;
    return this.setState({
      data
    });
  }

  /**
   * onClick - handles the onClick event
   * @param  {object} event the event handler
   * @return {void} no return or void
   */
  onClick(event) {
    const selectedUser = event.target.id;
    this.props.updateRole(selectedUser);
  }

  render() {
    const { rows,
      classValue,
      allRoles,
      onSelect,
      pagination } = this.props;
    let pageCount, currentPage;
    if (pagination) {
      pageCount = pagination.page_count;
      currentPage = pagination.page;
    }
    const usersTable = (
      <div>
        <table>
        <thead>
          <tr>
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
            <td id="firstname">{row.firstname}</td>
            <td>{row.lastname}</td>
            <td>{row.username}</td>
            <td>{row.email}</td>
            <td>{setRole.users(row.roleId, allRoles)}
            </td>
            <td>
           <a
           id="admin-action"
           onClick={this.onClick}
           className="btn-floating waves-effect waves-light orange">
           <i id={row.id} className="material-icons">create</i></a>
            </td>
          </tr></tbody>);
          }
          )}
      </table>
      <center>
        <Pagination
                items={pageCount} activePage={currentPage}
                maxButtons={pageCount}
                onSelect={onSelect}
            />
        </center>
        </div>
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
  rows: PropTypes.array,
  classValue: PropTypes.string,
  updateRole: PropTypes.func,
  allRoles: PropTypes.array,
  onSelect: PropTypes.func,
  pagination: PropTypes.object
};
export default UsersTable;
