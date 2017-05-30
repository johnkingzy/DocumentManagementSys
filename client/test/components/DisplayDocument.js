import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import DisplayDocument from '../../components/documents/DisplayDocument';

const setup = () => {
  const props = {
    document: {
      id: 33,
      ownerId: 3,
      title: 'Maximuf is in town',
      content: 'Today is Saturday',
      access: 'public',
      ownerRoleId: '1',
      createdAt: '2017-05-27T15:33:18.227Z',
      updatedAt: '2017-05-27T15:33:45.684Z',
      User: {
        id: 3,
        username: 'maximuf',
        firstname: 'Solomon'
      }
    },
    id: 1,
    viewDocument: () => {},
  };
  const wrapper = mount(<DisplayDocument {...props}/>);
  return {
    wrapper,
    props
  };
};

describe('<DisplayDocument />', () => {
  describe('when component is rendered', () => {
    it('should expect component to have a document props', () => {
      const { wrapper } = setup();
      expect(wrapper.props().document).toBeTruthy();
    });
    it('should expect component to have a viewDocument props', () => {
      const { wrapper } = setup();
      expect(wrapper.props().viewDocument).toBeTruthy();
    });
    it('should expect component to have an id props', () => {
      const { wrapper } = setup();
      expect(wrapper.props().id).toBeTruthy();
    });
    it('should be displayed with a list', () => {
      const { wrapper } = setup();
      expect(wrapper.find('li').length).toBe(1);
    });
    it('should be displayed with a list', () => {
      const { wrapper } = setup();
      expect(wrapper.find('li').length).toBe(1);
    });
    it('should be contain the document owner username', () => {
      const { wrapper } = setup();
      expect(wrapper.find('#username').length).toBe(1);
    });
    it('should contain the document title', () => {
      const { wrapper } = setup();
      expect(wrapper.find('.title').length).toBe(1);
    });
  });
});
