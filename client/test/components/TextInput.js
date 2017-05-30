import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import TextInput from '../../components/common/TextInput';

const setup = () => {
  const wrapper = shallow(<TextInput />);
  return {
    wrapper
  };
};
describe('<TextInput', () => {
  it('should have an input field', () => {
    const { wrapper } = setup();
    expect(wrapper.find('input').length).toBe(1);
  });
  it('should contain props', () => {
    const { wrapper } = setup();
    expect(wrapper.find('input').props())
          .toIncludeKeys([
            'type',
            'name',
            'id',
            'onChange',
            'onBlur',
            'onFocus',
            'value',
            'required'
          ]);
  });
});
