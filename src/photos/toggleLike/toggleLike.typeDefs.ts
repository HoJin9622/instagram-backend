import { gql } from 'apollo-server-core'

export default gql`
  type toggleLikeResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    toogleLike(id: Int!): toggleLikeResult
  }
`
