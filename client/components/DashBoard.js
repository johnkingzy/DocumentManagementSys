import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Modal from './documents/CreateDocument';
import DocumentList from './documents/DocumentsList';
import SearchResultList from './documents/SearchResultList';
import DocumentView from './documents/DocumentView';
import WelcomeBoard from './WelcomeBoard';
import SideBar from './common/SideBar';
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
      searching: false
    };
    this.openDocument = this.openDocument.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeView = this.changeView.bind(this);
    this.onChange = this.onChange.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.props.actions.loadDocuments().catch(() => {
        this.context.router.push('/login');
      });
      const userId = this.props.currentUser.id;
      this.props.actions.fetchUsers(userId);
    }
  }

  componentDidMount() {
    $('ul.tabs').tabs();
    $('ul.tabs').tabs('select_tab', 'public');
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

  deleteDocument(id) {
    this.props.actions.deleteDocument(id)
    .then(() => {
      this.setState({
        selectedId: ''
      });
      Materialize.toast('Document was deleted successfully', 1000, 'green');
    });
  }

  toggleOpen() {
    this.setState({
      selectedId: ''
    });
  }
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
    this.context.router.push('/');
  }

  /**
   * render - renders the class component
   * @return {object} containing the view elements
   */
  render() {
    const { allDocuments, search, currentUser, activeUser } = this.props;
    const searchedResult = search.searchedDocuments;
    const { createDocument, updateDocument } = this.props.actions;
    const { selectedId, searching } = this.state;
    const selectedDocument = allDocuments.filter((document) => {
      return (document.id === parseInt(selectedId, 10));
    });
    return (
      <div>
      <nav className="red">
        <div className="nav-wrapper">
          <div className="left col s12 m5 l5">
            <ul id="dropdown1" className="dropdown-content">
              <li><a href="#useredit">Edit Profile</a></li>
              <li className="divider"></li>
              <li><a onClick={this.logout} href="">Logout</a></li>
            </ul>
            <ul>
              <li><a href="#!" className="email-menu">
                <i className="material-icons">tag_faces</i>
                </a>
              </li>
              <li>
                <a href="#!" className="email-type">DataHub</a>
              </li>
            </ul>
          </div>
              <div className="col s12 m7 l7 hide-on-med-and-down">
                <ul className="right">
                  <div className="wrap">
                  <div className="search">
                    <form onSubmit={this.onSubmit}>
                      <input type="text"
                      className="searchTerm"
                      placeholder="What are you looking for?"
                      onChange={this.onChange}
                      name="search"
                      required
                      />
                      <a onClick={this.onSubmit} className="searchButton">
                        <i className="mdi-action-search"></i>
                    </a>
                    </form>
                  </div>
                  </div>
                  <li><a id="createbtn" data-target="modal2" className="dropdown-button modal-trigger">
                    <i className="material-icons left">create</i>
                    Create New Document
                    </a></li>
                  <li><a className="dropdown-button" href="#!" data-activates="dropdown1">
                    <i className="material-icons left">account_circle</i>
                    {activeUser.username}
                    </a></li>
                </ul>
              </div>

            </div>
          </nav>
          <div id="email-sidebar" className="col s1 m1 s1 card-panel">
            </div>
         { searching ?
         <SearchResultList
         searchedResult={searchedResult}
         openDocument={this.openDocument}
         changeView={this.changeView}
         /> :
         <DocumentList
         allDocuments={allDocuments}
         openDocument={this.openDocument}
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
  allDocuments: React.PropTypes.array.isRequired,
  search: React.PropTypes.object.isRequired,
  currentUser: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired,
};
DashBoard.contextTypes = {
  router: React.PropTypes.object.isRequired
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
  return {
    allDocuments: state.Documents,
    search: state.Search,
    currentUser: state.Auth.user,
    activeUser: state.Users.authUser
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
// export { DashaBoard as PureComponent };
