class User {
  constructor({ firstName, lastName, email, type = 'user', isAdmin = false } = {}) {
    this.id = null;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.type = type;
    this.isAdmin = isAdmin;
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }
}

export default User;
