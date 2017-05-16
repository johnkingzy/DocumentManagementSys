import types from '../actions/actionTypes';

const SignUpReducer = (state = [], action) => {
  switch (action.type) {
  case types.CREATE_USER_SUCCESS:
    return [
      ...state,
      Object.assign({}, { users: action.user })
    ];
  default:
    return state;
  }
};
export default SignUpReducer;
