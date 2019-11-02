const { db } = require('./db')
const app = require('./app')
const port = process.env.PORT || 8000

db.sync()
.then(() => {
  app.listen(port, () => console.log(`Server is listening on port ${port}!`))
})
