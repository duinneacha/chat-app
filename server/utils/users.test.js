const expect = require('expect');
const { Users } = require('./users');


describe('Users', () => {


  it('should add new user', () => {
    const testUsers = new Users();
    const user = {
      id: '123',
      name: 'Aidan',
      room: 'Dolly Parton Fans'
    };
    const resUser = testUsers.addUser(user.id, user.name, user.room);
    expect(testUsers.users).toEqual([user]);
  });
});