import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { GraphQLServer, PubSub } from 'graphql-yoga'

import graphql from './graphql'
graphql.context = { pubsub: new PubSub() }

dotenv.config()

// Connect to database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('Conected to database')
})

const options = {
  port: process.env.PORT,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground'
}

const server = new GraphQLServer(graphql)
server.start(options, ({ port }) => {
  console.log(`🚀  Server ready on ${port}`)
})
