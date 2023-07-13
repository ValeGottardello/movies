export const searchMovies = async ({ search }) => {
    if (search === "") return null

    try {
        const response = await fetch(`${process.env.REACT_APP_API}?apikey=${process.env.REACT_APP_API_KEY}&s=${search}`)
        const json = await response.json()
        const movies = json.Search
        if (movies) {
            return movies?.map(movie => ({
                id: movie.imdbID,
                title: movie.Title,
                year: movie.Year,
                type: movie.Type,
                poster: movie.Poster
            }))
        } else {
            return []
        }
       
    } catch (e) {
        throw new Error('Error searching movies')
    }
}

export const searchDetails = async (id) => {

    try {
        const response = await fetch(`${process.env.REACT_APP_API}?apikey=${process.env.REACT_APP_API_KEY}&i=${id}&plot=full`)
        const detailsJson = await response.json()
        
        if (detailsJson) {
            const mapDetails = {
                poster : detailsJson.Poster,
                title : detailsJson.Title,
                director : detailsJson.Director,
                actors : detailsJson.Actors,
                genre : detailsJson.Genre,
                released : detailsJson.Released,
                plot : detailsJson.Plot,
                awards : detailsJson.Awards,
                rated : detailsJson.Metascore,
                votes : detailsJson.imdbVotes,
                boxOffice : detailsJson.BoxOffice,
            } 

        return mapDetails
            
        }
       
    } catch (e) {
        throw new Error('Error searching movie')
    } 
}

