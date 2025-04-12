import { useState } from "react"
import { Link } from "react-router-dom"
import Pages from "./Pagination"
 

const RenderMovies = ({ movies }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const resultsPerPage = 4
    const indexOfLastResult = currentPage * resultsPerPage
    const indexOfFirstResult = indexOfLastResult - resultsPerPage
    const currentResults = movies.slice(indexOfFirstResult, indexOfLastResult)
    
    const paginate = (pageNumber, e) => {
        e.preventDefault()
        setCurrentPage(pageNumber)
      }
    return (
    <div className="flex flex-col">
      <div className="w-[80%] mx-auto sm:rounded-lg relative bg-yellow-100  shadow-xl px-6 pt-4 pb-8 flex">
        <ul className="movies mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {currentResults.length === 0 ? (
              <p>No results.</p>
            ) : ( 
              <>
              {currentResults.map(movie => (
                <Link 
                to={`/movies/${movie.id}`} 
                key={movie.id}>
                  <li  
                    className='flex flex-col justify-between gap-3 h-100'>
                    <h3 className="text-yellow-900">{movie.title.split(" ").length > 8 ? `${movie.title.split(" ").slice(0, 8).join(" ")} ...` : movie.title}</h3>
                    <p className="text-yellow-900">Year: {movie.year.split('').length > 4 ? movie.year.split("").slice(0, 4).join("") : movie.year}</p>
                    <img 
                      className="sm:h-[320px] md:h-[360px] lg:h-[400px]" 
                      src={movie.poster} 
                      alt={`poster of the ${movie.title} movie from ${movie.year}`} />
                  </li>
                </Link>
              ))}
            </>
          )}
        </ul>
      </div>
      <div className="self-center my-4">
        <Pages
          resultsPerPage={resultsPerPage}
          totalResults={movies.length}
          paginate={paginate}
        />
      </div>


    </div>

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
            null
            )}
        </>
    )
  }
}