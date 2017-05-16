/* eslint array-callback-return: "off" */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as DocumentActions from '../../actions/DocumentAction';
import PublicDocument from './PublicDocument';
import PrivateDocument from './PrivateDocument';
import RoleDocument from './RoleDocument';

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
    $('ul.tabs').tabs('select_tab', 'role');
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
    // console.log(openDocument);
    const { isPublic, isPrivate, isRole } = this.state;
    if (allDocuments && allDocuments.length > 0) {
      return (
            <div id="email-list" className="col s10 m5 l5 card-panel z-depth-1">
            <div className="card-tabs">
              <ul id="tabs-swipe-demo" className="tabs light-blue">
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
            { allDocuments && allDocuments.map((document) => {
              if (document.access === 'public') {
                return (<PublicDocument
                document={document}
                key={document.id}
                viewDocument={openDocument}
                />);
              }
            })}
            <br />
            </ul>}
           { isPrivate && <ul className="collection" id="private">
            { allDocuments && allDocuments.map((document) => {
              if (document.access === 'private') {
                return (<PrivateDocument
                document={document}
                viewDocument={openDocument}
                key={document.id}/>);
              }
            })}
            <br />
            </ul> }
            { isRole && <ul className="collection" id="role">
            { allDocuments && allDocuments.map((document) => {
              if (document.access === 'role') {
                return (<RoleDocument
                document={document}
                id={document.id}
                viewDocument={openDocument}
                />);
              }
            })}
            <br />
              </ul> }
            </div>
      );
    }
    return (
      <div id="email-list" className="col s10 m5 l5 card-panel z-depth-1">
        <div className="card-tabs">
              <ul className="tabs tabs-fixed-width">
                <li className="tab">
                <a className="active"
                href="#public">Public</a></li>
                <li className="tab"><a href="#private">Private</a></li>
                <li className="tab"><a href="#role">Role</a></li>
              </ul>
            <ul className="collection" id="public">
            <span> You have No Public Documents </span>
            <br />
            </ul>
            <ul className="collection" id="private">
              <span> You have No Private Documents </span>
            <br />
            </ul>
            <ul className="collection" id="role">
              <span> You have No Role Documents </span>
            <br />
            </ul>
            </div>
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
