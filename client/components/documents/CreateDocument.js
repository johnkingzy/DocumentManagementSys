import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DocumentForm from './DocumentForm';
import * as DocumentActions from '../../actions/DocumentAction';


/** @class CreateDocumentModal
 * @classdesc component for create document modal
 */
class CreateDocumentModal extends React.Component {
  /* eslint-disable Unexpected alert */

  /**
   * constructor - contains the constructor
   * @param  {object} props the properties of the class component
   * @param {object} context
   * @return {void} no return or void
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      documents: Object.assign({}, this.props.document),
      errors: {},
    };
    this.onSave = this.onSave.bind(this);
    this.clearError = this.clearError.bind(this);
    this.updateDocumentState = this.updateDocumentState.bind(this);
  }

  componentDidMount() {
    $('select').material_select();
    $('#access').on('change', this.updateDocumentState);
    $('.modal-trigger').leanModal();
  }


  /**
   * updateDocumentState - handles the content event handler
   * @param  {object} event the event for the content field
   * @return {void} no return or void
   */
  updateDocumentState(event) {
    const field = event.target.name;
    const documents = this.state.documents;
    documents[field] = event.target.value;
    return this.setState({
      documents
    });
  }

  /**
   * onSave - handles the onSave event handler
   * @param {object} event the event handler
   */
  onSave(event) {
    event.preventDefault();
    this.setState({
      errors: {},

    });
    const { errors, isValid } = this.validate(this.state.documents);
    if (!isValid) {
      this.props.createDocument(this.state.documents)
      .then(() => {
        Materialize.toast('Document Created Successfully', 1000, 'green',
        () => {
          $('#modal2').closeModal({ dismissible: true });
          $('.lean-overlay').css({ display: 'none' });
          $('.lean-overlay').remove();
          // this.context.router.push('/');
        });
      });
    } else {
      this.setState({
        errors,
        invalid: true
      });
    }
  }

/**
   * clearError - clears error when onFocus
   * @param  {object} event the event handler
   * @return {void} no returns or void
   */
  clearError() {
    let errors = this.state.errors;
    if (errors) {
      errors = {};
      const invalid = false;
      this.setState({ errors, invalid });
    }
  }

  validate(state) {
    const errors = {};
    let isValid = false;
    if (!(state.title.length >= 5)) {
      errors.title = 'Title should have a minimum of 5 characters';
    }
    if (!(state.content.length >= 5)) {
      errors.content = 'Content should have a minimum of 5 characters';
    }
    if (Object.keys(errors).length !== 0) {
      isValid = true;
    }
    return {
      errors,
      isValid
    };
  }
  /**
   * render - renders the class component
   * @return {object} returns an object
   */
  render() {
    const { errors } = this.state;
    return (
      <div id="modal2" className="modal modalStyle">
        <div className="modal-content" id="createDocument">
          <nav className="light-reddish darken-3">
            <div className="nav-wrapper">
              <div className="left col s12 m5 l5">
                <ul>
                  <li><a href="#!" className="email-menu">
                    <i className="material-icons">keyboard_backspace</i>
                  </a>
                  </li>
                  <li><a href="#!" className="email-menu">
                  <i className="material-icons">tag_faces</i>
                  </a>
                  </li>
                </ul>
              </div>
              <div className="col s12 m7 l7 hide-on-med-and-down">
                <ul className="right">
                  <li><a href="#!"><i className="material-icons">attach_file</i>
                  </a>
                  </li>
                  <li><a href="#!" className="modal-action modal-close">
                    <i className="material-icons">close</i></a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div className="model-email-content">
          <div className="row">
            <DocumentForm
            onChange={this.updateDocumentState}
            documents={this.state.documents}
            error={errors}
            onSave={this.onSave}
            />
          </div>
        </div>
      </div>);
  }
}


/**
 * mapStateToProps - maps state value to props
 * @param  {object} state the store state
 * @param  {type} ownProps the component state
 * @return {Object} returns an object
 */
function mapStateToProps(state, ownProps) {
  const { show, selectedId } = ownProps;
  let document = {
    title: '',
    access: '',
    content: ''
  };
  if (!show && selectedId) {
    document = state.Documents;
  }
  return {
    document
  };
}

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
CreateDocumentModal.propTypes = {
  createDocument: React.PropTypes.func.isRequired,
  document: React.PropTypes.object.isRequired
};

CreateDocumentModal.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps,
  mapDispatchToProps)(CreateDocumentModal);
