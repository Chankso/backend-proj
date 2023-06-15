module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '123456789',
      database: 'testdb',
    },
  },
  //needs to be altered
  staging: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '123456789',
      database: 'testdb',
    },
  },
  //needs to be altered
  production: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '123456789',
      database: 'testdb',
    },
  },
};
