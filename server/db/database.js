// Establish connection to Postgres db via new Sequelize instance

const chalk = require('chalk')
const Sequelize = require('sequelize')
const pkg = require('../../package.json')

// Assumes DB name is same as app name, as defined in package.json
const dbName = process.env.NODE_ENV === 'test' ? `${pkg.name}-test` : pkg.name
console.log(chalk.yellow(`Opening database connection to ${dbName}!`))

// env.DATABASE_URL is checked first if using Heroku for deployment
const db = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`, {
  logging: false,
})

module.exports = db
