require('dotenv').config()
import { ApolloServer } from 'apollo-server'
import client from './client'
import schema from './schema'
import { getUser } from './users/users.utils'

const PORT = process.env.PORT
const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.authorization),
      client,
    }
  },
})

server
  .listen(PORT)
  .then(() =>
    console.log(`🚀 Server is running on http://localhost:${PORT}/ ✅`)
  )
