/* eslint array-callback-return: "off" */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as DocumentActions from '../../actions/DocumentAction';
import DisplayDocument from './DisplayDocument';

class SearchResultList extends React.Component {

  render() {
    const { searchedResult, openDocument, changeView } = this.props;
    return (
          <div id="email-list" className="col s10 m5 l5 card-panel z-depth-1">
            <nav className="light-reddish darken-3">
              <div className="nav-wrapper">
                <div className="left col s12 m12 l12">
              <ul>
                <li>
                  <a onClick={changeView} className="email-menu">
                  <i className="material-icons">keyboard_backspace</i>
                  </a>
                  </li>
                <li>
                    Showing search result
                  </li>
                <li className="right">
                <a onClick={changeView} className="modal-action modal-close">
                  <i className="material-icons">close</i>
                  </a>
                </li>
              </ul>
              </div>
          </div>
        </nav>
          <ul className="collection">
          {
          searchedResult && searchedResult.length > 0 ?
          searchedResult.map((document) => {
            return (<DisplayDocument
            document={document}
            key={document.id}
            viewDocument={openDocument}
            />);
          }) : <center><span> No result was Found </span></center>
          }
          <br />
          </ul>
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

SearchResultList.propTypes = {
  searchedResult: React.PropTypes.array.isRequired,
  openDocument: React.PropTypes.func.isRequired,
  changeView: React.PropTypes.func.isRequired,
  actions: React.PropTypes.object.isRequired
};
export default connect(null, mapDispatchToProps)(SearchResultList);
