require('dotenv').config()
import * as http from 'http'
import * as express from 'express'
import * as logger from 'morgan'
import { ApolloServer } from 'apollo-server-express'
import client from './client'
import { typeDefs, resolvers } from './schema'
import { getUser } from './users/users.utils'

const PORT = process.env.PORT
const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    if (req) {
      return {
        loggedInUser: await getUser(req.headers.authorization),
        client,
      }
    }
    return { client }
  },
})

const app = express()
app.use(logger('tiny'))
apollo.applyMiddleware({ app })
app.use('/static', express.static('uploads'))

const httpServer = http.createServer(app)
apollo.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () =>
  console.log(`🚀 Server is running on http://localhost:${PORT}/ ✅`)
)
