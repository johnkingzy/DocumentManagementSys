export const validateInput = (state) => {
  const errors = {};
  let isValid = false;
  const regexp = /\S+@\S+\.\S+/;
  if (!(regexp.test(state.email))) {
    errors.email = 'Please Enter a valid email address';
  }
  if (state.username && !(state.username.length >= 5)) {
    errors.username = 'Username must have a minimum of 5 characters';
  }
  if (state.password && !(state.password.length >= 8)) {
    errors.password = 'Password should have a minimum of 8 characters';
  }
  if (Object.keys(errors).length !== 0) {
    isValid = true;
  }
  return {
    errors,
    isValid
  };
};

export const validate = (state) => {
  const errors = {};
  let isValid = false;
  if (!(state.title.length >= 5)) {
    errors.title = 'Title should have a minimum of 5 characters';
  }
  if (!(state.content.length >= 5)) {
    errors.content = 'Content should have a minimum of 5 characters';
  }
  if (!(state.access.length >= 5)) {
    errors.access = 'Please select an access type';
  }
  if (Object.keys(errors).length !== 0) {
    isValid = true;
  }
  return {
    errors,
    isValid
  };
};
export const getFirstLetter = (word) => {
  return word.split('')[0];
};

export const getDate = (date) => {
  return date.split('T')[0];
};
