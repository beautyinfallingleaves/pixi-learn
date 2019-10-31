// Bring Sequelize db instance and models together

const db = require('./database')

const User = require('./user')

// TODO - establish associations between models

module.exports = {
  db,
  User,
}
