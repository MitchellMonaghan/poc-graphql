import express from 'express'
import graphqlHttp from 'express-graphql'

const app = express()
app.use('graphql', graphqlHttp({}))

const port = 4000

app.listen(port, () => {
  console.log(`Now listening for requests on ${port}`)
})
