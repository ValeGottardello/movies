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
const getRandomMovie = async () => {

    try {
        
        const searchTerms = ['love', 'life', 'men', 'women', 'time', 'story', 'movie', 'day', 'night', 'world'];
        const randomIndex = Math.floor(Math.random() * searchTerms.length);
        const searchTerm = searchTerms[randomIndex];

        const response = await fetch(`${process.env.REACT_APP_API}?apikey=${process.env.REACT_APP_API_KEY}&s=${searchTerm}`)
        const data = await response.json();
        const randomMovies = data.Search

        if (data.Response === 'True' && data.Search && data.Search.length > 0) {
            return randomMovies?.map(movie => ({
                id: movie.imdbID,
                title: movie.Title,
                year: movie.Year,
                type: movie.Type,
                poster: movie.Poster
            })).slice(0,9)
        } else {
            throw new Error('No se encontraron películas para el término de búsqueda.');
        }
    } catch (error) {
        console.error('Error al obtener una película aleatoria:', error.message);
        return null;
    }
  }
 

  export const getRandomMovieGroups = async () => {
    const randomMovies = await getRandomMovie();
    
    if (randomMovies) {
        const groupsOfThree = randomMovies.reduce((acc, movie, index) => {
            const groupIndex = Math.floor(index / 3);
            if (!acc[groupIndex]) {
                acc[groupIndex] = [];
            }
            acc[groupIndex].push(movie);
            return acc;
        }, []);

        return groupsOfThree;
    }
    
    return null;
};