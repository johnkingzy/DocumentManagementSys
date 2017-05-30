import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import { spy } from 'sinon';
import DocumentView from '../../components/documents/DocumentView';

const props = {
  currentDocument: [{
    id: 1,
    title: 'my doc',
    content: 'this is my doc',
    ownerId: 3,
    User: {
      id: 3,
      username: 'maximuf',
      firstname: 'Solomon',
      lastname: 'Kingsley',
      email: 'johnkingzy@gmail.com',
      bio: '',
      roleId: 1,
      active: true,
    },
    createdAt: '2017-05-17T00:45:19.104Z'
  }],
  updateDocument: () => {},
  toggleOpen: () => {},
  changeView: () => {},
  deleteDocument: () => {},
  currentUser: {
    id: 3,
    username: 'maximuf',
    firstname: 'Solomon',
    lastname: 'Kingsley',
    email: 'johnkingzy@gmail.com',
    bio: '',
    roleId: 1,
    active: true,
  }
};
const setup = () => {
  const wrapper = mount(<DocumentView {...props}/>);
  return {
    wrapper
  };
};
describe('<DocumentView />', () => {
  describe('when component is at its default state', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup().wrapper;
    });
    it('should render "my doc" as the document title', () => {
      expect(wrapper.find('.email-subject').text()).toBe('my doc');
    });
    it('should render "this is my doc" as the document content', () => {

      expect(wrapper.find('#document-content').text()).toBe('this is my doc');
    });
    it('should display the user info', () => {

      expect(wrapper.find('#avatar').length).toBe(1);
      expect(wrapper.find('#username').length).toBe(1);
      expect(wrapper.find('#bio').length).toBe(1);
    });
  });
  describe('when component state changes', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup().wrapper;
      wrapper.setState({ isEditing: true });
    });
    it('should render <EditDocument /> when isEditing is true', () => {
      expect(wrapper.find('EditDocument').length).toBe(1);
    });
    it('should set onChange as <EditDocument /> props value', () => {
      expect(wrapper.find('EditDocument').props()).toIncludeKeys([
        'onChange',
        'access',
        'content',
        'onSubmit',
        'options',
        'invalid'
      ]);
    });
    it('should pass the "onSubmit" props as a function', () => {
      expect(wrapper.find('EditDocument').props().onSubmit).toBeA('function');
    });
    it('should pass the "onChange" props as a function', () => {
      expect(wrapper.find('EditDocument').props().onChange).toBeA('function');
    });
    it('should pass the "invalid" props as a boolean', () => {
      expect(wrapper.find('EditDocument').props().invalid).toBeA('boolean');
    });
    it('should pass the "options" props as an array', () => {
      expect(wrapper.find('EditDocument').props().options).toBeA('array');
    });
    it('should pass the "title" props as a string', () => {
      expect(wrapper.find('EditDocument').props().title).toBeA('string');
    });
    it('should pass the "content" props as a string', () => {
      expect(wrapper.find('EditDocument').props().content).toBeA('string');
    });
    it('should pass the "access" props as a string', () => {
      expect(wrapper.find('EditDocument').props().access).toBeA('string');
    });
  });
  describe('when logged in user is the owner of the document', () => {
    it('should make the actions button available to the user', () => {
      const wrapper = setup().wrapper;
      expect(wrapper.find('#actions').length).toBe(1);
    });
    it('should call the componentDidMount() lifecycle method', () => {
      const componentDidMountSpy = spy(DocumentView.prototype,
      'componentDidMount');
      const wrapper = mount(<DocumentView {...props} // eslint-disable-line
      componentDidMount={componentDidMountSpy}/>);
      expect(DocumentView.prototype.componentDidMount.calledOnce).toBeTruthy();
      componentDidMountSpy.restore();
    });
  });
});
