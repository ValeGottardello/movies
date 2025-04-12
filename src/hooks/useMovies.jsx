import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../service/movies'

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

    //use memo used to avoid re-render the function again if the their dependencies have NOT changed {sort, movies} 
    const sortedMovies = useMemo(() => {
        return sort 
        ? [...movies].sort((a,b) => a.title.localeCompare(b.title)) 
        : movies
    }, [sort, movies])
    

    
    return { movies: sortedMovies , getMovies, loading, setLoading,errorMovies : error }
}


    // useMemo is to memorize a calculation, so that it avoids doing it when it is not necessary (when the input is changed), but only when certain information changes (the movies to be rendered, or the sort or the movie) 
    // Se usa dentro de un componente funcional, y su propósito es memorizar un valor que resulta de una función costosa, para evitar recalcularlo si las dependencias no cambian.
// useCallback is the same than usememo but just for functions, for ex used here in getMovies. [useCallback use behind the scene: useMemo]
    // for reasons of performance
    // const sortedMovies = 
    // sort 
    // ? [...movies].sort((a,b) => {
    //     console.log(search)
    //     return a.title.localeCompare(b.title)}) 
    // : movies

