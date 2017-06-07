import React from 'react';
import TextInput from '../common/TextInput';

const EditProfile = (
  {
    userDetail,
    onChange,
    onSave,
    errors,
    checkUserExists,
    clearError,
    invalid
  }
) => {
  return (
    <form className="col s12" onSubmit={onSave} method="post">
      <div className="row">
        <div className="col s12" />
      </div>
      <div className="row">
        <TextInput
          type="text"
          className="input-field col m6 s12"
          name="firstname"
          id="firstname"
          onChange={onChange}
          error={errors.firstname}
          label="First Name"
          labelclass="active"
          value={userDetail.firstname}
          required
        />
        <TextInput
          className="input-field col m6 s12"
          type="text"
          name="lastname"
          id="lastname"
          onChange={onChange}
          error={errors.lastname}
          label="Last Name"
          value={userDetail.lastname}
          labelclass="active"
          required
        />
      </div>
      <div className="row">
        <TextInput
          className="input-field col m6 s12"
          type="text"
          name="username"
          id="username"
          onChange={onChange}
          error={errors.username}
          onBlur={checkUserExists}
          onFocus={clearError}
          value={userDetail.username}
          label="Username"
          labelclass="active"
          required
        />
        <TextInput
          className="input-field col m6 s12"
          type="email"
          name="email"
          id="email"
          onChange={onChange}
          error={errors.email}
          onBlur={checkUserExists}
          onFocus={clearError}
          value={userDetail.email}
          label="Email Address"
          labelclass="active"
          required
        />
      </div>
      <center>
        <div className="row">
          <button
            type="submit"
            name="btn_login"
            className="col s12 btn btn-large waves-effect light-reddish darken-3"
            disabled={invalid}
          > Update Account </button>
        </div>
      </center>
    </form>
  );
};

EditProfile.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired,
  userDetail: React.PropTypes.object.isRequired,
  checkUserExists: React.PropTypes.func.isRequired,
  clearError: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object.isRequired,
  invalid: React.PropTypes.bool.isRequired
};
export default EditProfile;
