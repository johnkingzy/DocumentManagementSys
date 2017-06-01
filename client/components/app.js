import React, { PropTypes } from 'react';

 /* eslint-disable react/prefer-stateless-function */
/**
 * @class App
 * @classdesc main app component
 */
class App extends React.Component {

  /**
   * render - renders app component
   * @return {object} the component view
   */
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};
export default App;
