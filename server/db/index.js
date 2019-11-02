// Bring Sequelize db instance and models together

const db = require('./database')

const User = require('./user')

// Model associations below

module.exports = {
  db,
  User,
}
