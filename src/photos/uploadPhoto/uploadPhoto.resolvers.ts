import { Resolvers } from '../../types'
import { protectedResolver } from '../../users/users.utils'
import { processHashtags } from '../photos.utils'

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser, client }) => {
        let hashtagObjs = null
        if (caption) {
          hashtagObjs = processHashtags(caption)
        }
        return client.photo.create({
          data: {
            file,
            caption,
            user: { connect: { id: loggedInUser.id } },
            ...(hashtagObjs.length > 0 && {
              hashtags: { connectOrCreate: hashtagObjs },
            }),
          },
        })
      }
    ),
  },
}

export default resolvers
