const { db } = require('./server/db')
const app = require('./server')
const port = process.env.PORT || 3000

db.sync()
.then(() => {
  app.listen(port, () => console.log(`Server is listening on port ${port}!`))
})
