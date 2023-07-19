import { Movies } from "../components/RenderMovies";
import { BiSearchAlt } from "react-icons/bi";
import { Spinner } from "react-bootstrap";
import RandomMovies from "../components/RandomMovies";
export default function Home ({ movies, getMovies, loading, errorMovies, search, updateSearch, error, sort, setSort }) {
  
    const handleSubmit = (evt) => {
      evt.preventDefault()
      getMovies({ search })
    } 
  
    const handleChange = ({ target }) => {
      const newSearch = target.value
      updateSearch(newSearch)
      getMovies({ search: newSearch })
    }
  
    const handleSort = () => {
      setSort(!sort)
    }

    return (
        <div className="min-h-[78vh]">
            <header className='flex flex-row gap-[30px] my-[40px] w-9/12 mx-auto justify-center '> 
                <form action="" onSubmit={handleSubmit} className='form flex flex-col gap-3'>
                    <div className='flex flex-row gap-4'>
                        <label className="relative block" htmlFor='true'>
                            <span className="sr-only">Search</span>
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                <svg className="h-5 w-5 fill-slate-300 mt-1" viewBox="0 0 20 20"><BiSearchAlt/></svg>
                            </span>
                            <input 
                            className="placeholder:italic placeholder:text-slate-400 block bg-yellow-100 w-full border border-yellow-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                            placeholder="Harry Potter ..." 
                            type="text" 
                            name="query" 
                            value={search}
                            onChange={handleChange} 
                            style={{
                                borderColor: error ? 'red' : 'grey'
                            }} 
                            />
                        </label>
                        <button type='submit' className="bg-transparent text-yellow-400 px-2 border border-yellow-500 rounded-full">Search</button>
                    </div>
                    <div className='flex flex-row gap-4 justify-center'>
                        <label htmlFor="order" className="text-yellow-500">Sort</label>
                        <input type='checkbox' onChange={handleSort} checked={sort} />
                    </div>
                </form> 
                {error && <p style={{color:'red'}} className='text-center text-yellow-500'>{error}</p>}
            </header>
            <main className='flex flex-grow justify-center py-6 flex-col'>
                { loading ? (
                     <div className="self-center">
                     <Spinner animation="border" role="status" >
                         <span className="visually-hidden ">Loading...</span>
                     </Spinner>
                 </div>
                ) : <Movies movies={movies}/>}
                { errorMovies && <p className='text-center text-yellow-500'>There are no results for your search</p>}
                { movies.length == 0 && <RandomMovies /> }
            </main>
        </div>
    )
}