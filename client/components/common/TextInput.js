import React, { PropTypes } from 'react';

const TextInput = (
  {
    type,
    className,
    name,
    id,
    onChange,
    onKeyUp,
    error,
    onBlur,
    onFocus,
    value,
    label,
    labelclass,

  }
) => (
  <div className={className}>
    <input
      type={type}
      name={name}
      id={id}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={onKeyUp}
      required
      value={value}
    />
    { error && <span className="red-text">{error}</span> }
    <label htmlFor="{label}" className={labelclass}>{label}</label>
  </div>);

TextInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyUp: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  labelclass: PropTypes.string
};

export default TextInput;
