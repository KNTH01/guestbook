# Guestbook

This is a simple guestbook. I started this to make some experimentations

![Guestbook app](https://raw.githubusercontent.com/KevinNTH/guestbook/master/Guestbook.png)

## The stack

I experiment some tools and come up with this stack. I do like this stack which includes:
- [ExpressJS](http://expressjs.com/)
- [PassportJS](http://passportjs.org/)
- [KnexJS](http://knexjs.org/) and [ObjectionJS](http://vincit.github.io/objection.js/)
- [Winston](https://github.com/winstonjs/winston)
- [Mocha](https://mochajs.org/) and [ChaiJS](http://chaijs.com/)
- [Nunjucks](https://mozilla.github.io/nunjucks/)

## Installation

### Prerequisite

- NodeJS 6.5.0
- MySQL


### Clone the repository

`git clone git@github.com:KevinNTH/guestbook.git`

### Install dependencies

When the repository is cloned, go in and run `npm install`.

### Configuration

You will have to edit the **configuration** :
* `./config/db.js`
* `./app/config/authConfig.js`
* `knexfile.js`

I have the unversioned `config_secret` directory which contains 2 files, feel free to use it if you need to or change it:
* `authenticationProviders.js`
```js
module.exports = {
  development: {
    host: 'localhost',
    user: 'user',
    password: 'passwd',
    database: 'guestbook'
  },
  test: {
    host: 'localhost',
    user: 'user',
    password: 'passwd',
    database: 'guestbook_test'
  },
  production: {

  }
}
```
* `db.js`
```js
module.exports = {
  google: {
    clientID: 'xxx.apps.googleusercontent.com',
    clientSecret: 'xxx',
    callbackURL: 'http://127.0.0.1:3000/users/auth/google/callback',
  },
  github: {
    clientID: 'xxx',
    clientSecret: 'xxx',
    callbackURL: 'http://127.0.0.1:3000/users/auth/github/callback'
  },
  twitter: {
    consumerKey: 'xxx',
    consumerSecret: 'xxx',
    callbackURL: 'http://127.0.0.1:3000/users/auth/twitter/callback'
  }
}
```

### Run the migrations and seed the database

I use the great knex's migration tools. In order to execute migrations, you have to install knex : `npm install -g knex`
You need to create your database first,
Then run migrations: `knex migrate:latest`
Then run seeds: `knex seed:run`

### Run the server

Use `npm run start` to start the server.
Use `npm run dev` to start `nodemon` on the server.
Use `npm run test` to run `mocha`.

## Features

### User management

The user can authenticate himself with Google social provider, or create a local account and sign in with his credentials.

### Post messages

When the user is authenticated, he is able to see the message list and submit his message to the database.

### Logs

Logs are handled by __winston__ and are stored in `./logs` directory. Use the `logger` object from `./app/logger.js` to log things with __winston__. A option is set to print objects within the terminal in a nice YMAL format.

## To do

- Authorization: connect other social providers to the current authenticated user
- what ever
