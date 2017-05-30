import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import SignUpForm from '../../components/authentication/SignUpForm';

const setup = () => {
  const props = {};
  const wrapper = shallow(<SignUpForm {...props}/>);
  return {
    wrapper,
    props
  };
};

describe('<SignUpForm />', () => {
  describe('when a component is rendered', () => {
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
      expect(wrapper.find('TextInput').length).toBe(6);
    });
  });
  describe('props value on DocumentForm', () => {
    it('should contain onSubmit', () => {
      const { wrapper } = setup();
      expect(wrapper.props().onSubmit).toBeA('function');
    });
    it('should contain onSubmit', () => {
      const { wrapper } = setup();
      expect(wrapper.state()).toIncludeKeys(
        ['username',
          'firstname',
          'lastname',
          'password',
          'email',
          'errors'
        ]);
    });
  });
});
