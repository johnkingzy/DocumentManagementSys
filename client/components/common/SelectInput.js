import React from 'react';
import PropTypes from 'prop-types';

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
      <option value="" disabled selected> Choose your option </option>
      {options && options.map((option) => {
        return (<option key={option.value} value={option.value}>
            {option.text}</option>);
      })}
    </select>
    <label>{label}</label>
    { error && <span className="red-text">{error}</span> }
  </div>);

SelectInput.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  defaultOption: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
};

export default SelectInput;
