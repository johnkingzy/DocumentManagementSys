import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Modal from './documents/CreateDocument';
import DocumentList from './documents/DocumentsList';
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
  constructor(props) {
    super(props);
    this.state = {
      document: {
        title: '',
        content: ''
      },
      isOpen: false
    };
  }
  componentDidMount() {
    this.props.actions.loadDocuments();
    $('ul.tabs').tabs();
    $('ul.tabs').tabs('select_tab', 'public');
    $('.tooltipped').tooltip({ delay: 50 });
    $('.dropdown-button').dropdown();
  }
  componentWillUnMount() {

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

  /**
   * render - renders the class component
   * @return {object} containg the view elements
   */
  render() {
    const { createDocument } = this.props.actions;
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
        <DocumentList allDocuments={this.props.allDocuments} />
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
  actions: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(DocumentActions, dispatch)
  };
}
function mapStateToProps(state) {
  return {
    allDocuments: state.Documents
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
