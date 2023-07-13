import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../api/movies'

export function useMovies ({ search, sort}) {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const previousSearch = useRef(search)


    const getMovies = useCallback(async ({ search }) => {

        if (search === previousSearch.current) return
            
        try {
            setLoading(true)
            setError(null)
            const newMovies = await searchMovies({ search })
            setMovies(newMovies)

        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }    
    }, [])

    const sortedMovies = useMemo(() => {
        return sort 
        ? [...movies].sort((a,b) => a.title.localeCompare(b.title)) 
        : movies
    }, [sort, movies])
    

    
    return { movies: sortedMovies , getMovies, loading, setLoading,errorMovies : error }
}


    // useMemo is to memorize a calculation, so that it avoids doing it when it is not necessary (when the input is changed), but only when certain information changes (the movies to be rendered, or the sort or the movie) 
    // useCallback is the same than usememo but just for functions, for ex used here in getMovies. [useCallback use behind the scene: useMemo]
    // for reasons of performance
    // const sortedMovies = 
    // sort 
    // ? [...movies].sort((a,b) => {
    //     console.log(search)
    //     return a.title.localeCompare(b.title)}) 
    // : movies

