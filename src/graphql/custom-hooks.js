import { login, userList } from './queries'
import { addUser, addMovieQuery, removeMovieQuery } from './mutations'

import { useLazyQuery, useMutation } from '@apollo/client'

export const useList = () => {
    const result = useLazyQuery(userList) 
    return result
}
export const useUser = () => {
    const result = useMutation(addUser) //sign up
    return result
}

export const useOldUser = () => {
    const result = useLazyQuery(login) //login
    return result
}

export const useAddMovie = (userId) => {
    const [ addMovie ] = useMutation(addMovieQuery)

    const handleAddMovie = async (movie, userId, movie_id) => {
        try {

            const result = await addMovie({
                variables: {
                    movie: {
                        cast: movie.actors,
                        img: movie.poster,
                        name: movie.title,
                        plot: movie.plot,
                        omdbId: movie_id
                    },
                    userId: userId,
                }
            })
            if (result.data) {
                return result.data.addMovie
            }
        } catch (e) {
        console.error('Error:', e);
        }
    }
    return handleAddMovie

}
export const useRemoveMovie = () => {
    const [ removeMovie ] = useMutation(removeMovieQuery)
    const handleRemoveMovie = async (movie_id) => {
        try {
            const result = await removeMovie({
                variables: {
                    movieId : movie_id
                }
            })
            if (result.data) {
                return result.data.removeMovie
            }
        } catch (e) {
        console.error('Error:', e);
        }
    }
    return handleRemoveMovie

}