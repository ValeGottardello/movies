import { gql } from '@apollo/client';

export const addUser = gql`
mutation Mutation($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      _id
      email
      list {
        cast
        img
        name
        plot
        _id
      }
      name
    }
}
`;

export const login = gql`
mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      email
      list {
        cast
        img
        name
        plot
        _id
      }
      name
    }
  }
`;

export const addMovieQuery = gql`
mutation AddMovie($movie: MovieInput!, $userId: ID!) {
    addMovie(movie: $movie, userId: $userId) {
      _id
      cast
      img
      name
      plot
    }
}
`;