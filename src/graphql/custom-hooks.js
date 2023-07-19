import { listOfMovies } from './queries'
import { addUser, login, addMovieQuery } from './mutations'
import { useLazyQuery, useMutation, gql } from '@apollo/client'

// export const useList = () => {
//     const results = useLazyQuery(listOfMovies)
//     return results
// }
const query = gql`
query Query($findUserId: ID!) {
    findUser(id: $findUserId) {
        _id
      list {
        _id
        cast
        img
        name
        plot
      }
    }
  }
`
export const useUser = () => {
    const result = useMutation(addUser)
    return result
}

export const useOldUser = () => {
    const result = useMutation(login)
    return result
}

export const useAddMovie = (userId) => {
    const [ addMovie ] = useMutation(addMovieQuery)
        
    const handleAddMovie = async (movie, userId) => {
        try {
            const result = await addMovie({
                variables: {
                movie: {
                    cast: movie.actors,
                    img: movie.poster,
                    name: movie.title,
                    plot: movie.plot,
                },
                userId: userId,
                },
                update: (cache, { data }) => {
                const existingData = cache.readQuery({
                    query: query,
                    variables: { findUserId: userId },
                });

                const newMovie = data?.addMovie;

                if (existingData && newMovie) {
                    cache.writeQuery({
                    query: query,
                    variables: { findUserId: userId },
                    data: {
                        findUser: {
                        ...existingData.findUser,
                        list: [...existingData.findUser.list, newMovie],
                        },
                    },
                    });
                }
                },
            })

        } catch (e) {
        console.error('Error:', e);
        }
    }
    return handleAddMovie

}