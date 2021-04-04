import { Resolvers } from '../../types'
import { protectedResolver } from '../../users/users.utils'

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser, client }) => {
        if (caption) {
          /// parse caption
          // get or create Hashtags
        }
        // save the photo with parsed hashtags
        // add the photo to the hashtags
      }
    ),
  },
}

export default resolvers
