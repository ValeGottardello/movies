const RenderMovies = ({ movies }) => {


    return (
      <ul className="movies">
      {movies.map(movie => (
        <li key={movie.id}>
          <h3>{movie.title.split(" ").length > 6 ? `${movie.title.split(" ").slice(0, 6).join(" ")} ...` : movie.title}</h3>
          <p>Year: {movie.year}</p>
          <img src={movie.poster} alt={`poster of the ${movie.title} movie from ${movie.year}`} />
        </li>
      ))}
    </ul>
    )
  }

const NoMoviesResults = () => {
    return (
        <p>There are no results for your search</p>
    )
}

export function Movies ({ movies }) {

    const hasMovies = movies.length > 0

    return  (
        <>
            {hasMovies ? (
            <RenderMovies movies={movies} />
            ) : (
            <NoMoviesResults />
            )}
        </>
    )
}