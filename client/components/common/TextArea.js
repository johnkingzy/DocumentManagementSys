import React, { PropTypes } from 'react';

const TextArea = (
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
    label,
    labelclass,
  }
) => (
  <div className="input-field col m12 s12">
    <textarea
      type={type}
      className={className}
      name={name}
      id={id}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      required
      value={value}
    />
    { error && <span className="red-text">{error}</span> }
    <label htmlFor="{label}" className={labelclass}>{label}</label>
  </div>);

TextArea.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  labelclass: PropTypes.string
};

export default TextArea;
