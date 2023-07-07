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