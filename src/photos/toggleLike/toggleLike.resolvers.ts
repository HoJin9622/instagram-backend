import { Resolvers } from '../../types'
import { protectedResolver } from '../../users/users.utils'

const resolvers: Resolvers = {
  Mutation: {
    toogleLike: protectedResolver(
      async (_, { id }, { loggedInUser, client }) => {
        const ok = await client.photo.findUnique({ where: { id } })
        if (!ok) {
          return { ok: false, error: 'Photo not found' }
        }
      }
    ),
  },
}

export default resolvers
