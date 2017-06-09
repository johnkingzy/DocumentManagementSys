import { combineReducers } from 'redux';
import Documents from './DocumentReducer';
import Auth from './AuthReducer';
import Search from './SearchReducer';
import Users from './UserReducer';
import Roles from './RoleReducer';

const rootReducer = combineReducers({
  Documents,
  Auth,
  Search,
  Users,
  Roles
});
export default rootReducer;
