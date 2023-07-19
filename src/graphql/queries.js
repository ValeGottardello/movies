import { gql } from '@apollo/client';

export const listOfMovies = gql`
    query findUser($findUserId: ID!) {
        findUser(id: $findUserId) {
            list {
                _id
                cast
                img
                name
                plot
            }
        }
    } 
`;

// get({
//     variables: {
//         id,
//     }
// })
// const { data, error, loading } = useQuery(listOfMovies)