import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Modal from './documents/CreateDocument';
import DocumentList from './documents/DocumentsList';
import DocumentView from './documents/DocumentView';
import WelcomeBoard from './WelcomeBoard';
import SideBar from './common/SideBar';
import * as DocumentActions from '../actions/DocumentAction';

/**
* @class CreateDocument
* @classdesc Handles the create document component
*/
class Dashboard extends React.Component {

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
      selectedId: ''
    };
    this.openDocument = this.openDocument.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
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
    $('.tooltipped').tooltip({ delay: 50 });
    $('.dropdown-button').dropdown();
  }

  componentWillReceiveProps() {
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

  /**
   * render - renders the class component
   * @return {object} containg the view elements
   */
  render() {
    const allDocuments = this.props.allDocuments;
    const { createDocument, updateDocument } = this.props.actions;
    const selectedId = this.state.selectedId;
    const selectedDocument = allDocuments.filter((document) => {
      return (document.id === parseInt(selectedId, 10));
    });
    return (
        <div>
          <SideBar />
        <div className="fixed-action-btn actionStyle">
          <a
          id="createbtn"
          className="btn-floating btn-large orange modal-trigger"
          data-target="modal2">
            <i className="material-icons">create</i></a>
        </div>
         <DocumentList
         allDocuments={allDocuments}
         openDocument={this.openDocument}
         />
        { selectedId && allDocuments ? <DocumentView
        updateDocument={updateDocument}
        currentDocument={selectedDocument}
        deleteDocument={this.deleteDocument}
        toggleOpen={this.toggleOpen}
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
Dashboard.propTypes = {
  allDocuments: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired,
};
Dashboard.contextTypes = {
  router: React.PropTypes.object.isRequired
};
/**
 * mapDispatchToProps - maps dispatch to props value
 * @param  {Function} dispatch dispatchs function
 * @return {Object} returns an Object
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(DocumentActions, dispatch)
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
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
