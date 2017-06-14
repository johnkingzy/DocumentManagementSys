/* eslint array-callback-return: "off" */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'react-materialize';
import { bindActionCreators } from 'redux';

import * as DocumentActions from '../../actions/DocumentAction';
import DisplayDocument from './DisplayDocument';

class SearchResultList extends React.Component {
  render() {
    const { searchedResult,
      onSelect,
      pagination,
      openDocument,
      changeView } = this.props;
    let pageCount, currentPage;
    if (pagination) {
      pageCount = pagination.page_count;
      currentPage = pagination.page;
    }
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
            <center><Pagination
                items={pageCount} activePage={currentPage}
                maxButtons={pageCount}
                onSelect={onSelect}
            /></center>
          <div className="center-align" />
          </ul>
          </div>
    );
  }
  }


/**
 * mapDispatchToProps - maps states to props value
 * @param  {Functions} dispatch dispatches an action
 * @return {Object} returns a§n objects
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(DocumentActions, dispatch)
  };
}

SearchResultList.propTypes = {
  searchedResult: PropTypes.array.isRequired,
  openDocument: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  pagination: PropTypes.object
};
export default connect(null, mapDispatchToProps)(SearchResultList);
