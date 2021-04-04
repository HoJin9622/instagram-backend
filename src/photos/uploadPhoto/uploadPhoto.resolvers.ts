import { Resolvers } from '../../types'
import { protectedResolver } from '../../users/users.utils'

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser, client }) => {
        if (caption) {
          const hashtags = caption.match(/#[\w]+/g)
        }
        client.photo.create({
          data: {
            file,
            caption,
            hashtags: {
              connectOrCreate: [
                {
                  where: {
                    hashtag: '#food',
                  },
                  create: {
                    hashtag: '#food',
                  },
                },
              ],
            },
          },
        })
        // save the photo with parsed hashtags
        // add the photo to the hashtags
      }
    ),
  },
}

export default resolvers
