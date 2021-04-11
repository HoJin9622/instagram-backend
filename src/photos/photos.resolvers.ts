import { Resolvers } from '../types'

const resolvers: Resolvers = {
  Photo: {
    user: ({ userId }, _, { client }) => {
      return client.user.findUnique({ where: { id: userId } })
    },
    hashtags: ({ id }, _, { client }) =>
      client.hashtag.findMany({ where: { photos: { some: { id } } } }),
    likes: ({ id }, _, { client }) =>
      client.like.count({ where: { photoId: id } }),
    commentNumber: ({ id }, _, { client }) =>
      client.comment.count({ where: { photoId: id } }),
    comments: ({ id }, _, { client }) =>
      client.comment.findMany({
        where: { photoId: id },
        include: { user: true },
      }),
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false
      }
      return userId === loggedInUser.id
    },
    isLiked: async ({ id }, _, { loggedInUser, client }) => {
      if (!loggedInUser) {
        return false
      }
      const ok = await client.like.findUnique({
        where: { photoId_userId: { photoId: id, userId: loggedInUser.id } },
        select: { id: true },
      })
      if (ok) {
        return true
      }
      return false
    },
  },
  Hashtag: {
    photos: ({ id }, { page }, { client, loggedInUser }) => {
      return client.hashtag.findUnique({ where: { id } }).photos()
    },
    totalPhotos: ({ id }, _, { client }) =>
      client.photo.count({ where: { hashtags: { some: { id } } } }),
  },
}

export default resolvers
