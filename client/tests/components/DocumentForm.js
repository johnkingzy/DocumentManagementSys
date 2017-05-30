import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import DocumentForm from '../../components/documents/DocumentForm';

const setup = () => {
  const props = {
    documents: {},
    onSave: () => {},
    onChange: () => {},
    clearError: () => {},
    loading: true,
    errors: {},
  };
  const wrapper = shallow(<DocumentForm {...props}/>);
  return {
    wrapper,
    props
  };
};
describe('<DocumentForm />', () => {
  describe('when component is rendered', () => {
    it('should contain just 1 form', () => {
      const { wrapper } = setup();
      expect(wrapper.find('form').length).toBe(1);
    });

    it('should have an input submit button', () => {
      const { wrapper } = setup();
      expect(wrapper.find('button').length).toBe(1);
    });

    it('should contain a <TextInput/> component', () => {
      const { wrapper } = setup();
      expect(wrapper.find('TextInput').length).toBe(1);
    });
    it('should have a <TextArea/> component', () => {
      const { wrapper } = setup();
      expect(wrapper.find('TextArea').length).toBe(1);
    });
    it('should have a <SelectInput/> component', () => {
      const { wrapper } = setup();
      expect(wrapper.find('SelectInput').length).toBe(1);
    });
  });
  describe('props value on DocumentForm', () => {
    it('should contain onSubmit', () => {
      const { wrapper } = setup();
      expect(wrapper.props().onSubmit).toBeA('function');
    });
  });
});
