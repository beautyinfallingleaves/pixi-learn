const Sequelize = require('sequelize')
const db = require('./database')
const crypto = require('crypto')
const _ = require('lodash')

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  password: {
    type: Sequelize.STRING,
  },
  salt: {
    type: Sequelize.STRING,
  },
  googleId: {
    type: Sequelize.STRING
  },
}, {
  hooks: {
    beforeCreate: setSaltAndPassword,
    beforeUpdate: setSaltAndPassword,
  }
})

// Instance methods
User.prototype.correctPassword = function (candidatePassword) {
  return this.Model.encryptPassword(candidatePassword, this.salt) === this.password
}

User.prototype.sanitize = function () {
  return _.omit(this.toJSON(), ['password', 'salt']);
}

// Class methods
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64');
}

User.encryptPassword = function (plainText, salt) {
  const hash = crypto.createHash('RSA-SHA256');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
}

function setSaltAndPassword (user) {
  // we need to salt and hash again when the user enters their password for the first time
  // and do it again whenever they change it
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
}

module.exports = User
