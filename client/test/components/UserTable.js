import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import UsersTable from '../../components/adminpanel/users/UsersTable';

const setup = () => {
  const props = {
    rows: [
      {
        id: 1,
        roleId: 1
      }
    ],
    allRoles: [
      {
        id: 1,
        title: 'admin'
      }
    ],
    onSelect: () => {},
    pagination: {},
  };
  const wrapper = mount(<UsersTable {...props}/>);
  return {
    wrapper,
    props
  };
};
describe('<UsersTable />', () => {
  describe('when a component is rendered', () => {
    it('should have a rows props', () => {
      const { wrapper } = setup();
      expect(wrapper.props().rows).toBeTruthy();
    });
    it('should have a pagination props', () => {
      const { wrapper } = setup();
      expect(wrapper.props().pagination).toBeTruthy();
    });
    it('should have a allRoles props', () => {
      const { wrapper } = setup();
      expect(wrapper.props().allRoles).toBeTruthy();
    });
    it('should have an onSelect props', () => {
      const { wrapper } = setup();
      expect(wrapper.props().onSelect).toBeTruthy();
    });
    it('should contain one table element', () => {
      const { wrapper } = setup();
      expect(wrapper.find('table').length).toBe(1);
    });
    it('should contain a pagination component', () => {
      const { wrapper } = setup();
      expect(wrapper.find('Pagination').length).toBe(1);
    });
  });
});
