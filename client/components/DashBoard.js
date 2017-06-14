import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import logo from '../assets/img/data-logo.png';

import Modal from './documents/CreateDocument';
import DocumentList from './documents/DocumentsList';
import SearchResultList from './documents/SearchResultList';
import DocumentView from './documents/DocumentView';
import WelcomeBoard from './WelcomeBoard';

import * as DocumentActions from '../actions/DocumentAction';
import * as SearchActions from '../actions/SearchActions';
import * as UserActions from '../actions/UserAction';
import * as AuthActions from '../actions/AuthAction';

/**
* @class CreateDocument
* @classdesc Handles the create document component
*/
class DashBoard extends React.Component {

  /**
   * constructor - contains the properties for the class
   * @param  {object} props the properties of the class
   * @param  {object} context context of parent class
   * @return {void} no return or void
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      isOpen: false,
      selectedId: '',
      searching: false,
      allDocuments: []
    };
    this.openDocument = this.openDocument.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeView = this.changeView.bind(this);
    this.onChange = this.onChange.bind(this);
    this.logout = this.logout.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentWillMount() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.props.actions.loadDocuments();
      const userId = this.props.currentUser.id;
      this.props.actions.fetchUsers(userId);
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      allDocuments: nextProps.allDocuments
    });
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

  openDocument(event) {
    event.preventDefault();
    const id = event.target.id;
    this.setState({
      selectedId: id
    });
  }

  changeView() {
    $('ul.tabs').tabs();
    $('ul.tabs').tabs('select_tab', 'public');
    this.setState({
      searching: false
    });
  }

  /**
   * deleteDocument - delete a documents
   * @param  {Number} id document id
   * @return {void} no return or void
   */
  deleteDocument(id) {
    this.props.actions.deleteDocument(id)
    .then(() => {
      this.setState({
        selectedId: ''
      });
      Materialize.toast('Document was deleted successfully', 1000, 'green');
    });
  }

  /**
   * toggleOpen - open a document
   * @return {void} no return or void
   */
  toggleOpen() {
    this.setState({
      selectedId: ''
    });
  }

  /**
   * onSubmit - handles search action
   * @param  {Object} event the event handler
   * @return {void} no return or void
   */
  onSubmit(event) {
    const searchQuery = this.state.search;
    event.preventDefault();
    if (!searchQuery) {
      Materialize.toast('Please type in a Keyword', 1000, 'red');
    } else {
      const filtered = searchQuery.trim();
      if (!filtered) {
        Materialize.toast('Please type in a Keyword', 1000, 'red');
      } else {
        this.props.actions.searchDocuments(searchQuery);
        this.setState({
          searching: true
        });
      }
    }
  }
  onSelect(pageNumber) {
    const searchQuery = this.state.search;
    const offset = (pageNumber - 1) * 6;
    this.props.actions.searchDocuments(searchQuery, offset);
  }

  /**
   * onChange - handles the onChange event
   * @param  {object} event the event handler
   * @return {void} no return or void
   */
  onChange(event) {
    const field = event.target.name;
    const state = this.state;
    state[field] = event.target.value;
    return this.setState({
      state
    });
  }
   /**
   * logout - logout a user out
   * @param  {type} event the event handler
   * @return {void} no return or void
   */
  logout(event) {
    event.preventDefault();
    this.props.actions.logout();
    this.context.router.push('/login');
  }
  redirect(path) {
    return browserHistory.push(path);
  }

  /**
   * render - renders the class component
   * @return {object} containing the view elements
   */
  render() {
    const {
      allDocuments,
      pagination,
      search,
      currentUser,
      activeUser } = this.props;
    const { searchedDocuments, searchedPageCount } = search;
    const { createDocument, updateDocument } = this.props.actions;
    const { selectedId, searching } = this.state;
    const selectedDocument = allDocuments.filter((document) => {
      return (document.id === parseInt(selectedId, 10));
    });
    const isAdmin = activeUser.roleId === 1;
    return (
      <div>
      <nav id="dashboard" className="light-reddish darken-3">
        <div className="nav-wrapper">
          <div className="left col s12 m5 l5">
            <a onClick={() => this.redirect('/')}>
            <img alt={logo} src={logo} className="log" /></a>
          </div>
              <div className="col s12 m7 l7 hide-on-med-and-down">
                <ul className="right">
                  <div className="wrap">
                  <div className="search">
                    <form onSubmit={this.onSubmit}>
                      <input type="text"
                      id="search"
                      className="searchTerm"
                      placeholder="What are you looking for?"
                      onChange={this.onChange}
                      name="search"
                      required
                      />
                      <a onClick={this.onSubmit} className="searchButton">
                        <i className="mdi-action-search" />
                    </a>
                    </form>
                  </div>
                  </div>
                  <li id="username" className="noHover">
                  <i className="material-icons left">account_circle</i>
                  {activeUser.username}</li>
                  <li id="create-document">
                  <a id="createbtn" data-target="modal2"
                  className="dropdown-button modal-trigger">
                    <i className="material-icons left">create</i>
                    Create New Document
                    </a></li>
                    {isAdmin &&
                    <li><a
                    id="admin-link"
                    onClick={() => this.redirect('/admin')} href="">
                    Admin Panel
                    </a>
                      </li>}
                    <li><a className="logout" onClick={this.logout} href="">
                      <i className="material-icons">power_settings_new</i>
                      </a></li>
                </ul>
              </div>

            </div>
          </nav>
         { searching ?
         <SearchResultList
         searchedResult={searchedDocuments}
         pagination={searchedPageCount}
         openDocument={this.openDocument}
         changeView={this.changeView}
         onSelect={this.onSelect}
         /> :
         <DocumentList
         allDocuments={allDocuments}
         pagination={pagination}
         openDocument={this.openDocument}
         loadDocuments={this.props.actions.loadDocuments}
         />}
        { selectedId && allDocuments ?
        <DocumentView
        updateDocument={updateDocument}
        currentDocument={selectedDocument}
        deleteDocument={this.deleteDocument}
        toggleOpen={this.toggleOpen}
        currentUser={currentUser}
        changeView={this.changeView}
        /> :
         <WelcomeBoard
         allDocuments={allDocuments}
          openDocument={this.openDocument}
          activeUser={activeUser}
         /> }
        <Modal
          createDocument={createDocument}
          onClose={this.toggleModal}
        >
          Heres some content for the modal
        </Modal>
      </div>
    );
  }
}
DashBoard.propTypes = {
  allDocuments: PropTypes.array.isRequired,
  search: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  activeUser: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  pagination: PropTypes.object.isRequired
};
DashBoard.contextTypes = {
  router: PropTypes.object.isRequired
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
      AuthActions,
      UserActions,
      DocumentActions,
      SearchActions), dispatch)
  };
}
/**
 * mapStateToProps - maps state value to props
 * @param  {object} state the store state
 * @param  {type} ownProps the component state
 * @return {Object} returns an object
 */
function mapStateToProps(state) {
  let allDocuments = [];
  let pagination = {};
  if (state.Auth.isAuthenticated) {
    allDocuments = state.Documents.allDocuments;
    pagination = state.Documents.Pagination;
  }
  return {
    allDocuments,
    search: state.Search,
    currentUser: state.Auth.user,
    isAuthenticated: state.Auth.isAuthenticated,
    activeUser: state.Users.authUser,
    pagination
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
// export { DashaBoard as PureComponent };
