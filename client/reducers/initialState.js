export default {
  manageUsers: { allUsers: [], userDetails: false, authUser: {} },
  loggedInUser: {
    isAuthenticated: false,
    user: {},
  },
  manageDocuments: {
    allDocuments: [],
    Pagination: {}
  },
  manageRoles: { roles: [] },
  manageSearch: { searchedUsers: [], searchedDocuments: [] },
  currentlySelected: {},
  selectedDocument: ''
};
