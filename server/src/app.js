import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import graphqlHttp from 'express-graphql'

import schema from './schema/schema'

// Load env file
dotenv.config()

// Connect to database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('Conected to database')
})

// Setup express app
const app = express()
app.use('/graphql', graphqlHttp({
  schema,
  graphiql: true
}))

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Now listening for requests on ${port}`)
})
