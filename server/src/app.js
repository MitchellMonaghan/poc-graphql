import express from 'express'
import graphqlHttp from 'express-graphql'

import schema from './schema/schema'

const app = express()
app.use('/graphql', graphqlHttp({
  schema,
  graphiql: true
}))

const port = 4000 // process.env.port

app.listen(port, () => {
  console.log(`Now listening for requests on ${port}`)
})
