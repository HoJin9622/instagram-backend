import * as bcrypt from 'bcrypt'
import { Resolver } from '../../types'
import { protectedResolver } from '../users.utils'

const resolverFn: Resolver = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser, client }
) => {
  console.log(avatar)

  let uglyPassword = null
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10)
  }
  const ok = await client.user.update({
    where: { id: loggedInUser.id },
    data: {
      firstName,
      lastName,
      username,
      email,
      bio,
      ...(uglyPassword && { password: uglyPassword }),
    },
  })
  if (ok) {
    return {
      ok: true,
    }
  } else {
    return {
      ok: false,
      error: 'Could not update profile.',
    }
  }
}

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
}
