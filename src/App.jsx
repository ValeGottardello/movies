import './App.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';

import Home from './pages/Home';
import MovieDetailPage from './pages/MovieDetailPage';
import MyList from './pages/MyList';

import { useMovies } from './hooks/useMovies';
import useSearch from './hooks/useSearch';

import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';


function App() {

  const [ sort, setSort ] = useState(false)
  const { search, updateSearch, error} = useSearch()
  const { movies, getMovies, loading, setLoading, errorMovies } = useMovies({ search, sort})
  const [user, setUser] = useState('')

  return (
    <div className='wrapper flex flex-col min-h-[100vh] bg-slate-800 justify-between' >
      <NavBar user={user} setUser={setUser}/>
      <div className='min-h-[70vh]'>
        <Routes>      
          <Route path="/" element={<Home 
          movies={movies}
          getMovies={getMovies}
          loading={loading}
          errorMovies={errorMovies}
          search={search}
          updateSearch={updateSearch}
          error={error}
          sort={sort}
          setSort={setSort}
          />} />
          <Route path="/movies/:movieId" element={<MovieDetailPage 
            loading={loading}
            setLoading={setLoading}
            user={user}
            />} />       
          <Route path="/movies/list" element={<MyList user={user} />} />       
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App;