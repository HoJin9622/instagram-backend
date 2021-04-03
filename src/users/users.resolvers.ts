import { Resolvers } from '../types'

const resolvers: Resolvers = {
  User: {
    totalFollowing: (root) => {
      console.log(root.username)
      return 0
    },
    totalFollowers: () => 999,
  },
}

export default resolvers
