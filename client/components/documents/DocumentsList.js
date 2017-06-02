/* eslint array-callback-return: "off" */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as DocumentActions from '../../actions/DocumentAction';
import DisplayDocument from './DisplayDocument';

class DocumentList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isPublic: true,
      isPrivate: false,
      isRole: false
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    $('ul.tabs').tabs();
    $('ul.tabs').tabs('select_tab', 'public');
  }

  componentWillUpdate() {
    $('ul.tabs').tabs();
    $('ul.tabs').tabs('select_tab', 'public');
  }

  onClick(event) {
    const id = event.target.name;
    if (id === 'public') {
      this.setState({
        isPublic: true,
        isPrivate: false,
        isRole: false
      });
    } else if (id === 'private') {
      this.setState({
        isPrivate: true,
        isPublic: false,
        isRole: false

      });
    } else if (id === 'role') {
      this.setState({
        isRole: true,
        isPrivate: false,
        isPublic: false,
      });
    }
  }

  render() {
    const { allDocuments, openDocument } = this.props;
    const { isPublic, isPrivate, isRole } = this.state;
    return (
          <div id="email-list" className="col s10 m10 l5 card-panel z-depth-1">
          <div className="card-tabs">
            <ul id="tabs-swipe-demo" className="tabs light-reddish darken-3">
              <li onClick={this.onClick} className="tab">
              <a className="active white-text"
              href="#public" name="public">
              Public
              </a></li>
              <li onClick={this.onClick} className="tab">
              <a className="white-text" href="#private" name="private">
              Private
              </a></li>
              <li onClick={this.onClick} className="tab">
                <a className="white-text" href="#role" name="role">
                Role
                </a></li>
            </ul>
          </div>
          { isPublic && <ul className="collection" id="public">
          {
          allDocuments &&
          allDocuments
          .filter(document => document.access === 'public').length > 0 ?
          allDocuments.map((document) => {
            if (document.access === 'public') {
              return (<DisplayDocument
              document={document}
              key={document.id}
              viewDocument={openDocument}
              />);
            }
          }) : <center>You have No Public Document</center>
          }
          <br />
          </ul>}
          { isPrivate && <ul className="collection" id="private">
          {
          allDocuments &&
          allDocuments
          .filter(document => document.access === 'private').length > 0 ?
          allDocuments.map((document) => {
            if (document.access === 'private') {
              return (<DisplayDocument
              document={document}
              viewDocument={openDocument}
              key={document.id}/>);
            }
          }) : <center>You have No Private Document</center>
          }
          <br />
          </ul> }
          { isRole && <ul className="collection" id="role">
          {
          allDocuments &&
          allDocuments
          .filter(document => document.access === 'role').length > 0 ?
          allDocuments.map((document) => {
            if (document.access === 'role') {
              return (<DisplayDocument
              document={document}
              id={document.id}
              viewDocument={openDocument}
              />
              );
            }
          }) : <center>You have No Role Document</center>
        }
          <br />
            </ul> }
          </div>
    );
  }
  }


/**
 * mapDispatchToProps - maps states to props value
 * @param  {Functions} dispatch dispatches an action
 * @return {Object} returns an objects
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(DocumentActions, dispatch)
  };
}

DocumentList.propTypes = {
  allDocuments: React.PropTypes.array.isRequired,
  openDocument: React.PropTypes.func.isRequired,
  actions: React.PropTypes.object.isRequired
};
export default connect(null, mapDispatchToProps)(DocumentList);
