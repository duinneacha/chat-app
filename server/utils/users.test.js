const expect = require('expect');
const { Users } = require('./users');


describe('Users Tests', () => {

  var users;


  beforeEach(() => {



    users = new Users();
    users.users = [{
      id: '1',
      name: 'Dolly Parton',
      room: 'Country Music Legends'
    },
    {
      id: '2',
      name: 'Johnny Cash',
      room: 'Country Music Legends'
    },
    {
      id: '3',
      name: 'Dick Pomphret',
      room: 'Port Users'
    },
    {
      id: '4',
      name: 'Mike Blethley',
      room: 'Port Users'
    }];

  });


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

  // Testing getUser
  it('should find a user', () => {
    const idToFind = '2';
    const retUser = users.getUser(idToFind);

    expect(retUser.id).toBe(idToFind);
  });

  it('should not find a user', () => {
    const idToFind = 'asd';
    const retUser = users.getUser(idToFind);

    expect(retUser).toBeFalsy();

  });

  // Testing removerUser
  it('should remove a user', () => {
    const idToFind = '4';
    const retUser = users.removeUser(idToFind);

    expect(retUser.id).toBe(idToFind);
    expect(users.users.length).toBe(3);

  });

  it('should not remove a user', () => {
    const idToFind = '34352';
    const retUser = users.removeUser(idToFind);

    expect(retUser).toBeFalsy();
    expect(users.users.length).toBe(4);

  });


  // Testing getUserList
  it('should return names for the Country Music Legends Club', () => {

    var userList = users.getUserList('Country Music Legends');

    expect(userList).toEqual(['Dolly Parton', 'Johnny Cash'])
  });
});