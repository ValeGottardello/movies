import { useCallback, useEffect, useState } from "react"
import { searchDetails } from "../service/movies"

export default function useDetails ({ movieId, setLoading}) {

    const [detailsMovie, setDetailsMovie ] = useState({})

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true)
                const details = await searchDetails(movieId)
                setDetailsMovie(details)
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
    
        fetchDetails()

    }, [movieId])
    

    return { movie: detailsMovie }

}