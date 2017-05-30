import React from 'react';
import { mount, shallow } from 'enzyme';
import expect from 'expect';
import DocumentForm from '../../components/documents/DocumentForm';

const props = {
  documents: {},
  onSave: () => {},
  onChange: () => {},
  clearError: () => {},
  loading: true,
  errors: {},
};

const setup = () => {
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
      const wrapper = shallow(<DocumentForm {...props}/>);
      const submitButton = wrapper.find('button').last();
      expect(submitButton.length).toBe(1);
      expect(submitButton.prop('type')).toBe('submit');
      submitButton.simulate('click');
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
