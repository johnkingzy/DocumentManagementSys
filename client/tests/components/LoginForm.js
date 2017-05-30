import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import LoginForm from '../../components/authentication/LoginModal';

const setup = () => {
  const props = {};
  const wrapper = shallow(<LoginForm {...props}/>);
  return {
    wrapper,
    props
  };
};

describe('<LoginForm />', () => {
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
      expect(wrapper.find('TextInput').length).toBe(2);
    });
  });
  describe('props value on DocumentForm', () => {
    it('should contain onSubmit', () => {
      const { wrapper } = setup();
      expect(wrapper.state()).toIncludeKeys(
        ['username',
          'password',
        ]);
    });
  });
});
