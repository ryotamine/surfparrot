// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection:{database: 'surfparrot',
      user: 'labber',
      password: 'labber'},
      migrations: {
        directory: './db/migrations'
      },
      seeds: { 
        directory: './db/seeds/dev'
      },
      useNullAsDefault: true
  },
};