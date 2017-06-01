import React from 'react';
import Navigation from '../includes/Navigation.js';

class NavBar extends React.Component {
  render() {
    const {
      onSubmit,
      onChange,
      searching,
      searchQuery,
      closeSearch
    } = this.props;
    return (
      <div>
      <Navigation />
      <nav className="blue">
        <div className="nav-wrapper">
          <form onSubmit={onSubmit}
          id="form-wrapper" className="col s5 m5 right">
              <input
              className="col s8 m8"
              type="text"
              placeholder="Search For Users"
              name="search"
              onChange={onChange}
              required />
              <button
              id="search"
              className="waves-effect waves-light orange btn col s3 m3"
              type="submit">
              <i className="material-icons">search</i> Search</button>
          </form>
          <ul id="nav-mobile" className="left">
            <li className=" orange">
              <a
              className="modal-trigger"
              data-target="modal1">Add a New Role</a></li>
              { searching && <li className="">
              <a
              className="">
              Showing Result for "{searchQuery}"</a></li>}
          </ul>
          <ul id="nav-mobile" className="right">
              { searching && <li className="white">
              <a
              onClick={closeSearch}
              className="close red-text">
              <i className="material-icons right">clear</i>
              </a></li>}
          </ul>
        </div>
      </nav>
      </div>
    );
  }
}
NavBar.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  searching: React.PropTypes.bool.isRequired,
  searchQuery: React.PropTypes.string.isRequired,
  closeSearch: React.PropTypes.func.isRequired
};
export default NavBar;
