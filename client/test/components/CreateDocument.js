import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import CreateDocument from '../../components/documents/CreateDocument';

const setup = () => {
  const props = {
    documents: {},
    onSave: () => {},
    onChange: () => {},
    clearError: () => {},
    loading: true,
    errors: {},
  };
  const wrapper = mount(<CreateDocument {...props}/>);
  return {
    wrapper,
    props
  };
};
