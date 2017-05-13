import { combineReducers } from 'redux';
import SignUp from './SignUpReducer';
import Documents from './DocumentReducer';
import FlashMessage from './FlashMessage';
import Auth from './AuthReducer';

const rootReducer = combineReducers({
  SignUp,
  Documents,
  FlashMessage,
  Auth
});
export default rootReducer;
