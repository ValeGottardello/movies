import { gql } from '@apollo/client';

export const userList = gql`
query FindById($findByIdId: ID!) {
    findById(id: $findByIdId) {
      list {
        cast
        _id
        img
        name
        omdbId
        plot
      }
    }
}
`
export const login = gql`
query Query($email: String!, $password: String!) {
    findUser(email: $email, password: $password) {
      _id
      email
      list {
        cast
        img
        _id
        name
        omdbId
        plot
        userId
      }
      name
    }
  }
`
