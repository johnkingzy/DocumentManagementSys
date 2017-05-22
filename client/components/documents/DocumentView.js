/* eslint array-callback-return: "off" */
import React from 'react';

import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import options from '../../data/options';
import { getFirstLetter, getDate } from '../../utils/helper';

export default class DocumentView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.state = {
      documents: {
        id: '',
        title: '',
        content: '',
        access: ''
      },
      errors: {},
      isEditing: false
    };
  }

  componentDidMount() {
    $('select').material_select();
  }

  componentWillReceiveProps() {
    this.setState(
      {
        isEditing: false,
      }
      );
  }

  onChange(event) {
    const field = event.target.name;
    const documents = this.state.documents;
    documents[field] = event.target.value;
    return this.setState({
      documents
    });
  }

  toggleEdit() {
    const currentDocument = this.props.currentDocument[0];
    const documents = this.state.documents;
    documents.id = currentDocument.id;
    documents.title = currentDocument.title;
    documents.content = currentDocument.content;
    documents.access = currentDocument.access;
    this.setState(
      {
        isEditing: !this.state.isEditing,
        documents
      }
        );
  }
  onSubmit(event) {
    event.preventDefault();
    this.setState({
      errors: {},
    });
    const { errors, isValid } = this.validate(this.state.documents);
    if (!isValid) {
      this.setState(
        {
          isEditing: false,
        }
        );
      this.props.updateDocument(this.state.documents)
      .then(() => {
        Materialize.toast('Document was updated successfully', 1000, 'green',
        () => {
          this.props.changeView();
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

  deleteDocument() {
    const { id } = this.props.currentDocument[0];
    this.props.deleteDocument(id);
  }

  render() {
    const currentDocument = this.props.currentDocument[0];
    const { currentUser } = this.props;
    const { title, content, access } = this.state.documents;
    let actions;
    if (currentUser && currentUser.id === currentDocument.ownerId) {
      actions = (
        <ul className="data-section left">
            <a
            className="teal-text left"
            onClick={this.toggleEdit}
            name="action"
            >
            <i className="material-icons right">create</i>
            </a>
            <li> | </li>
            <a
            className="red-text right"
            onClick={this.deleteDocument}
            type="submit" name="action"
            >
            <i className="material-icons">delete_sweep</i>
            </a>
            </ul>);
    }
    let documentBody;
    if (this.state.isEditing) {
      documentBody = (
        <div className="email-content">
        <form className="col s12" onSubmit={this.onSubmit} method="post">
        <TextInput
          className="input-field col m6 s12"
          type="text"
          name="title"
          id="title"
          onChange={this.onChange}
          error=""
          label="Title"
          labelclass="active"
          value={title}
          required
        />
        <TextArea
            id="content"
            type="text"
            name="content"
            className="materialize-textarea"
            onChange={this.onChange}
            labelclass="active"
            value={content}
            errors="{errors}"
            label="Content"
          />
          <div className="input-field col s12">
            {options && options.map((option, index) => {
              return (
                <p key={index}><input
                  name="access"
                  type="radio"
                  value={option.value}
                  onChange={this.onChange}
                  id={option.text}
                  checked={option.value === access}
                   />
                  <label
                  htmlFor={option.text}>
                  {option.text}
                  </label></p>);
            })}
          </div>
          <br />
          <br />
          <br />
           <button
              type="submit"
              name="btn_login"
              className="col s12 btn btn-large waves-effect light-blue darken-3"
              disabled={this.state.invalid}
            >Submit</button>
            </form>
          </div>
      );
    } else {
      documentBody = (
            <div className="email-content">
             <p className="email-subject truncate">
                {currentDocument && currentDocument.title}
            </p>
            <p>
                {currentDocument && currentDocument.content}
            </p>
            <br />
            </div>
        );
    }
    if (currentDocument) {
      return (
        <div id="email-details" className="col s12 m5 l5 card-panel">
            <nav className="data-nav white">
              <div className="nav-wrapper">
            {actions}
              <ul className="data-section right">
                  <a
                  className="red-text"
                  onClick={this.props.toggleOpen}
                  name="action"
                  >
                  <i className="material-icons right">clear</i>
                  </a>
                </ul>
                </div>
            </nav>
            <div className="grey-text text-lighten-2">
            <div className="email-content-wrap">
            <div className="row">
                <div className="col s10 m10 l10">
                <ul className="collection">
                    <li className="collection-item avatar">
                    <span id="avatar" className="circle blue darken-1">
                      {getFirstLetter(currentDocument.User.username)}
                      </span>
                    <span className="email-title black-text">
                    {currentDocument.User.username}
                    </span>
                    <p className="truncate grey-text ultra-small">
                        {currentDocument.User.bio}
                        </p>
                    <p className="grey-text ultra-small">
                    created at: {getDate(currentDocument.createdAt)}
                    </p>
                    </li>
                </ul>
                </div>
            </div>
            {documentBody}
            </div>
            </div>
            </div>
      );
    }
    return <h1> Hello </h1>;
  }
  }


DocumentView.propTypes = {
  currentDocument: React.PropTypes.array.isRequired,
  updateDocument: React.PropTypes.func.isRequired,
  toggleOpen: React.PropTypes.func.isRequired,
  changeView: React.PropTypes.func.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
  currentUser: React.PropTypes.object.isRequired
};
