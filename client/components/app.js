import React, { PropTypes } from 'react';
import NavigationBar from './includes/Navigation';

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
        <NavigationBar />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};
export default App;
