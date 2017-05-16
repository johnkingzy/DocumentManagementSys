import React from 'react';
import { getFirstLetter, getDate } from '../../utils/helper';

export default class RoleDocuments extends React.Component {
  render() {
    const { document, id, viewDocument } = this.props;
    return (
           <li key={id} className="collection-item avatar email-unread">
            <span className="circle blue darken-1">
              {getFirstLetter(document.User.username)}
              </span>
            <a onClick={viewDocument} id={document.id} className="email-title">
              {document.title}
              </a>
            <p id="truncate" className="truncate grey-text ultra-small">
              <i className="material-icons">person</i>
              <span id="txt3">{document.User.username}</span>
               <span className="grey-text right ultra-small">
                 <i className="material-icons">query_builder</i>
                 <span id="txt3">{getDate(document.createdAt)}</span>
                 </span>
                 </p>
          </li>
    );
  }
}
RoleDocuments.propTypes = {
  document: React.PropTypes.object.isRequired,
  id: React.PropTypes.number,
  viewDocument: React.PropTypes.func.isRequired
};
