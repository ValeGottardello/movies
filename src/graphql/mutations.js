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
        omdbId
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
      omdbId
    }
}
`;

export const removeMovieQuery = gql`
mutation Mutation($movieId: ID!) {
  removeMovie(movieID: $movieId) {
    _id
    cast
    img
    name
    omdbId
    plot
    userId
  }
}
`;