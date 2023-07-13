import { Movies } from "../components/RenderMovies";
import { BiSearchAlt } from "react-icons/bi";

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
            <header className='flex flex-col gap-5 m-10 w-9/12 mx-auto'> 
                <h1 className='text-center text-3xl'>
                Search your movie
                </h1>
                <form action="" onSubmit={handleSubmit} className='form flex flex-col gap-3 mx-auto'>
                    <div className='flex flex-row gap-4'>
                        <label className="relative block" htmlFor="search">
                            <span className="sr-only">Search</span>
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                <svg className="h-5 w-5 fill-slate-300 mt-1" viewBox="0 0 20 20"><BiSearchAlt/></svg>
                            </span>
                            <input 
                            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                            placeholder="Harry Potter ..." 
                            type="text" 
                            name="query" 
                            value={search}
                            onChange={handleChange} 
                            style={{
                                border:'1px solid grey',
                                borderColor: error ? 'red' : 'grey'
                            }} 
                            />
                        </label>
                        <button type='submit'>Search</button>
                    </div>
                    <div className='flex flex-row gap-4 justify-center'>
                        <label htmlFor="order">Sort Alphabetically</label>
                        <input type='checkbox' onChange={handleSort} checked={sort} />
                    </div>
                </form> 
                {error && <p style={{color:'red'}} className='text-center'>{error}</p>}
            </header>
            <main className='flex flex-grow justify-center py-6'>
                {
                loading ? <p className='text-center'>Loading</p> : <Movies movies={movies}/>
                }
                {
                errorMovies && <p className='text-center'>There are no results for your search</p>
                }
            </main>
        </div>
    )
}