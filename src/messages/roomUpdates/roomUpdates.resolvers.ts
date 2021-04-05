import { NEW_MESSAGE } from '../../constants'
import pubsub from '../../pubsub'
import { Subscription } from '../../types'

const resolvers: Subscription = {
  Subscription: {
    roomUpdates: {
      subscribe: () => pubsub.asyncIterator(NEW_MESSAGE),
    },
  },
}

export default resolvers
