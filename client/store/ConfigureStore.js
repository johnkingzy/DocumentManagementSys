import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducers from '../reducers';

const ConfigureStore = (initialState => createStore(
         rootReducers,
         initialState,
         compose(
           applyMiddleware(thunk, reduxImmutableStateInvariant()),
         window.devToolsExtension ? window.devToolsExtension() : f => f))
     );
export default ConfigureStore;
