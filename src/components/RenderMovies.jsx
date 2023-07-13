import { useEffect } from "react"
import { Link } from "react-router-dom"

const RenderMovies = ({ movies }) => {

    return (
      <div className="w-[80%] mx-auto sm:rounded-lg relative bg-white ring-1 ring-gray-900/5 shadow-xl px-6 pt-4 pb-8 flex">
        <ul className=" movies mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {movies.map(movie => (
          <Link 
          to={`/movies/${movie.id}`} 
          key={movie.id}>
            <li  
              className='flex flex-col justify-between gap-3'>
              <h3>{movie.title.split(" ").length > 6 ? `${movie.title.split(" ").slice(0, 6).join(" ")} ...` : movie.title}</h3>
              <p>Year: {movie.year.split('').length > 4 ? movie.year.split("").slice(0, 4).join("") : movie.year}</p>
              <img 
                className="sm:h-[320px] md:h-[360px] lg:h-[400px]" 
                src={movie.poster} 
                alt={`poster of the ${movie.title} movie from ${movie.year}`} />
            </li>
          </Link>
        ))}
      </ul>
      </div>
    )
  }

const NoMoviesResults = () => {
    return (
        <p className="text-center">There are no results for your search</p>
    )
}

export function Movies ({ movies }) {

  if(movies) {
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
}