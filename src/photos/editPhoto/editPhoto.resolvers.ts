import { Resolvers } from '../../types'
import { protectedResolver } from '../../users/users.utils'

const resolvers: Resolvers = {
  Mutation: {
    editPhoto: protectedResolver(
      async (_, { id, caption }, { loggedInUser, client }) => {
        const ok = await client.photo.findFirst({
          where: { id, userId: loggedInUser.id },
        })
        if (!ok) {
          return {
            ok: false,
            error: 'Photo not found.',
          }
        }
        const photo = await client.photo.update({
          where: { id },
          data: { caption },
        })
        console.log(photo)
      }
    ),
  },
}

export default resolvers
