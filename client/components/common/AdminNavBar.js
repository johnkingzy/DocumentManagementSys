import React, { PropTypes } from 'react';
import logo from '../../assets/img/data-logo.png';

class NavBar extends React.Component {
  render() {
    const {
      onSubmit,
      onChange,
      searching,
      searchQuery,
      closeSearch,
      redirect
    } = this.props;
    return (
      <div>
      <nav className="light-reddish darken-3">
        <div className="nav-wrapper">
          <div className="left col s12 m5 l5">
            <a onClick={() => this.redirect('/')}>
            <img alt={logo} src={logo} className="log" /></a>

          </div>
           <div className="col s12 m7 l7 hide-on-med-and-down">
                <ul className="right">
                  <div className="wrap">
                  <div className="search">
                    <form onSubmit={onSubmit}>
                      <input type="text"
                      id="search-user"
                      className="searchTerm"
                      placeholder="What are you looking for?"
                      onChange={onChange}
                      name="search"
                      required
                      />
                      <a onClick={onSubmit} className="searchButton">
                        <i className="mdi-action-search" />
                    </a>
                    </form>
                  </div>
                  </div>
                  { searching && <li>
                    <a
                    className="">
                    Showing Result for "{searchQuery}"</a></li>}
                    { searching && <li id="searching" className="white">
                    <a
                    onClick={closeSearch}
                    className="close red-text">
                    <i className="material-icons right">clear</i>
                    </a></li>}
                  <li>
                  <a id="createbtn" data-target="modal1"
                  className="dropdown-button modal-trigger">
                    <i className="material-icons left">create</i>
                    Add a New Role
                    </a></li>
                  <li><a onClick={() => redirect('/dashboard')} href="">
                  Dashboard
                  </a>
                </li>
                </ul>
              </div>
        </div>
      </nav>
      </div>
    );
  }
}
NavBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  searching: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string.isRequired,
  closeSearch: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired
};
export default NavBar;
