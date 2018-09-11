
// Users Class

class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    // return user that was removed
    const user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;

  }

  getUser(id) {
    // Get user
    return this.users.filter((user) => user.id === id)[0];
  }

  getUserList(room) {

    // return array filtering only those in the room requested
    const users = this.users.filter((user) => user.room === room);

    // take the array of objects and convert to an array of strings
    const namesArray = users.map((user) => user.name);

    return namesArray;

  }


}


module.exports = { Users };