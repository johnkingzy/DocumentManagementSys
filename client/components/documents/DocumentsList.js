/* eslint array-callback-return: "off" */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as DocumentActions from '../../actions/DocumentAction';
import DisplayDocument from './DisplayDocument';
import SelectInput from '../common/SelectInput';
import access from '../../data/options';

class DocumentList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentSection: 'public',
      allDocuments: [],
      currentPage: 1,
      totalCount: 1
    };
    this.filterAccess = this.filterAccess.bind(this);
    this.filterDocument = this.filterDocument.bind(this);
    this.onSelectPage = this.onSelectPage.bind(this);
  }

  /**
   * componentWillMount
   * @return {void} no return or void
   */
  componentWillMount() {
    this.filterDocument();
  }

  /**
   * componentDidMount
   * @return {void} no return or void
   */
  componentDidMount() {
    $('select').material_select();
    $('#section').on('change', this.filterAccess);
  }

  /**
   * componentWillReceiveProps
   * @param  {object} nextProps
   * @return {void} no return or void
   */
  componentWillReceiveProps(nextProps) {
    const allDocuments = nextProps.allDocuments.filter(document =>
    document.access === this.state.currentSection).slice(0, 6);
    const totalCount = Math.ceil((nextProps.allDocuments.filter(document =>
    document.access === this.state.currentSection).length) / 6);
    this.setState({
      allDocuments,
      totalCount
    });
  }

  /**
   * filterDocument - filters document
   * @return {void}  no return
   */
  filterDocument() {
    const pageNo = this.state.currentPage;
    const showing = this.props.allDocuments.slice();
    const pageLimit = 6;
    const pageOffset = (pageNo - 1) * pageLimit;
    const newShow = showing.filter(document =>
    document.access === this.state.currentSection);
    const allDocuments = newShow.slice(pageOffset, pageOffset + pageLimit);
    const totalCount = Math.ceil(newShow.length / 6);
    this.setState({
      allDocuments,
      totalCount
    });
  }

  /**
   * filterAccess - filters access type
   * @param  {object} event the event handler
   * @return {void} no return
   */
  filterAccess(event) {
    this.setState({
      currentSection: event.target.value,
      currentPage: 1
    }, this.filterDocument);
  }

  onSelectPage = (event) => {
    const { id } = event.target;
    const { totalCount, currentPage } = this.state;
    if (id === 'next' && currentPage !== totalCount) {
      const pageNumber = parseInt(currentPage, 10) + 1;
      this.setState({
        currentPage: pageNumber
      }, () => this.filterDocument());
    } else if (id === 'previous' && currentPage > 1) {
      const pageNumber = parseInt(currentPage, 10) - 1;
      this.setState({
        currentPage: pageNumber
      }, () => this.filterDocument());
    }
  }

  render() {
    const { openDocument } = this.props;
    const { allDocuments, currentPage, totalCount } = this.state;
    return (
          <div id="email-list" className="col s10 m10 l5 card-panel z-depth-1">
            <br />
            <div>
            <div className="row">
            <div className="col s6 m6 l6">
              <SelectInput
              id="section"
              name="section"
              options={access}
              label="Filter Documents by Access"
              />
              </div>
              <ul className="pagination col s6 m6 l6">
                <li
                className="waves-effect"
                onClick={this.onSelectPage}
                >
                  <a href="#!">
                    <i id="previous" className="material-icons">
                    navigate_before</i>
                  </a>
                </li>
                <li className="blue-text ultra-small">
                <h6
                className="paginate">
                Showing Page {currentPage} of {totalCount} </h6></li>
                <li
                className="waves-effect"
                onClick={this.onSelectPage}
                currentPage={currentPage}
                >
                  <a href="#!">
                    <i id="next" className="material-icons">navigate_next</i>
                  </a>
                </li>
              </ul>
            </div>
          <ul className="collection">
          {
          allDocuments &&
          allDocuments
          .length > 0 ?
          (allDocuments.map((document) => {
            return (<DisplayDocument
            document={document}
            key={document.id}
            viewDocument={openDocument}
            />);
          })) :
          <center>You currently have no {this.state.currentSection} documents
          </center>
        }
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
  allDocuments: PropTypes.array.isRequired,
  openDocument: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired
};
export default connect(null, mapDispatchToProps)(DocumentList);
