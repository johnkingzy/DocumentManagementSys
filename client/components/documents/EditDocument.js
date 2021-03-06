import React, { PropTypes } from 'react';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';

const EditDocument = (
  {
    onChange,
    onFocus,
    onSubmit,
    invalid,
    options,
    title,
    content,
    access,
    errors
  }
) => {
  return (
    <div className="email-content">
    <form className="col s12" onSubmit={onSubmit} method="post">
    <TextInput
      className="input-field col m12 s12"
      type="text"
      name="title"
      id="title"
      onChange={onChange}
      label="Title"
      labelclass="active"
      value={title}
      error={errors.title}
      onFocus={onFocus}
      required
    />
    <TextArea
        id="content"
        type="text"
        name="content"
        className="materialize-textarea"
        onChange={onChange}
        labelclass="active"
        value={content}
        onFocus={onFocus}
        error={errors.content}
        label="Content"
      />
      <div className="input-field col s12">
        {options && options.map((option, index) => {
          return (
            <p key={index}>
              <input
              name="access"
              type="radio"
              value={option.value}
              onChange={onChange}
              id={option.text}
              checked={option.value === access}
               />
              <label
              htmlFor={option.text}>
              {option.text}
              </label>
              { errors && <span className="red-text">{errors.access}</span> }
              </p>);
        })}
      </div>
      <br />
      <br />
      <br />
       <button
          type="submit"
          name="btn_login"
          className="col s12 btn btn-large waves-effect light-reddish darken-3"
          disabled={invalid}
        >Submit</button>
        </form>
      </div>
  );
};
EditDocument.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  access: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};
export default EditDocument;
