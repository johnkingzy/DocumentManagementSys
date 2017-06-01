const setRole = {
  users(roleId, allRoles) {
    const roleDetails = allRoles.filter((role) => {
      return role.id === roleId;
    });
    return roleDetails[0].title;
  }
};

export default setRole;
