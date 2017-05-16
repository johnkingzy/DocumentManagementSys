import React, { PropTypes } from 'react';

const SelectInput = (
  {
    id,
    name,
    error,
    className,
    onChange,
    options,
    value,
    label
  }
) => (
  <div className="input-field col s12">
    <select
    id={id}
    name={name}
    value={value}
    className={className}
    onChange={onChange}
    >
      <option value="" disabled> Choose your option </option>
      {options && options.map((option) => {
        return (<option key={option.value} value={option.value}>
            {option.text}</option>);
      })}
    </select>
    <label>{label}</label>
    { error && <span className="red-text">{error}</span> }
  </div>);

SelectInput.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  defaultOption: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string
};

export default SelectInput;
