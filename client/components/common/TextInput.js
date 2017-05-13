import React from 'react';
import PropTypes from 'prop-types';

const TextInput = (
  {
    type,
    className,
    name,
    id,
    onChange,
    error,
    onBlur,
    onFocus,
    value,
    label
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
      required
      value={value}
    />
    { error && <span className="red-text">{error}</span> }
    <label htmlFor="{label}">{label}</label>
  </div>);

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default TextInput;
