import './App.css';
import { Movies } from './components/RenderMovies';
import { useMovies } from './hooks/useMovies';
import useSearch from './hooks/useSearch';


function App() {

  const { search, updateSearch, error} = useSearch()
  const { movies, getMovies, loading, errorMovies } = useMovies({ search })

  const handleSubmit = (evt) => {
    evt.preventDefault()
    getMovies()
  } 

  const handleChange = ({ target }) => {
    updateSearch(target.value)
  }

  return (
    <div className='wrapper'>
      <header> 
        <h1>
          Search your movie
        </h1>
        <form action="" className='form' onSubmit={handleSubmit}>
          <input 
          style={{
            border:'1px solid grey',
            borderColor: error ? 'red' : 'grey'
          }} 
          onChange={handleChange}
          name='query' 
          value={search} 
          type="text" 
          placeholder='Harry Potter' />
          <button type='submit'>Search</button>
        </form> 
        {error && <p style={{color:'red'}}>{error}</p>}
      </header>
      <main>   
        {
          loading ? <p>Loading</p> : <Movies movies={movies}/>
        }
        {
          errorMovies && <p>There are no results for your search</p>
        }
      </main>
    </div>
  );
}

export default App;
