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
  }

  componentWillMount() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.props.actions.loadDocuments().catch(() => {
        this.context.router.push('/login');
      });
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

  changeView(event) {
    event.preventDefault();
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
    event.preventDefault();
    const searchQuery = this.state.search,
      filtered = searchQuery.trim();
    if (!filtered) {
      Materialize.toast('Please type in a Keyword', 1000, 'red');
    } else {
      this.props.actions.searchDocuments(searchQuery);
      this.setState({
        searching: true
      });
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
   * render - renders the class component
   * @return {object} containg the view elements
   */
  render() {
    const { allDocuments, search, currentUser } = this.props;
    const searchedResult = search.searchedDocuments;
    const { createDocument, updateDocument } = this.props.actions;
    const { selectedId, searching } = this.state;
    const selectedDocument = allDocuments.filter((document) => {
      return (document.id === parseInt(selectedId, 10));
    });
    return (
      <div>
      <nav id="horizontal-nav" className="white hide-on-med-and-down">
      <div className="nav-wrapper">
        <form onSubmit={this.onSubmit}
        id="form-wrapper" className="col s5 m5 left">
          <input
          className="col s8 m8"
          type="text"
          placeholder="Search For a Document"
          name="search"
          onChange={this.onChange}
          required />
          <button
          id="search"
          className="waves-effect waves-light orange btn col s3 m3"
          type="submit">
          <i className="material-icons">search</i> Search</button>
      </form>
                </div>
                </nav>
          <SideBar />
        <div className="fixed-action-btn actionStyle">
          <a
          id="createbtn"
          className="btn-floating btn-large orange modal-trigger"
          data-target="modal2">
            <i className="material-icons">create</i></a>
        </div>
         { searching ? <SearchResultList
         searchedResult={searchedResult}
         openDocument={this.openDocument}
         changeView={this.changeView}
         /> :
         <DocumentList
         allDocuments={allDocuments}
         openDocument={this.openDocument}
         />}
        { selectedId && allDocuments ? <DocumentView
        updateDocument={updateDocument}
        currentDocument={selectedDocument}
        deleteDocument={this.deleteDocument}
        toggleOpen={this.toggleOpen}
        currentUser={currentUser}
        /> :
         <WelcomeBoard
         allDocuments={allDocuments}
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
      Object.assign({}, DocumentActions, SearchActions), dispatch)
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
    currentUser: state.Auth.user
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
