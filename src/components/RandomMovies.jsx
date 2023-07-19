import { useEffect, useMemo, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import { getRandomMovieGroups } from '../api/movies';

export default function RandomMovies({ movies }) {
    const [randomMovies, setRandomMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    }
    useEffect(() => {
        const fetchRandomMovies = async () => {
          try {
            const newMoviesRandom = await getRandomMovieGroups();
            if (newMoviesRandom) {
              setRandomMovies(newMoviesRandom);
            }
          } catch (e) {
            console.log("Error", e.message);
          } finally {
            setLoading(false); 
          }
        };
    
        fetchRandomMovies();
    }, []);
  

  return (
 
    <div className="w-[70%] mx-auto sm:rounded-lg relative bg-yellow-100  shadow-xl px-6 pt-2 pb-8 flex">
        {loading ? (
            <div className="self-center justify-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        ) : ( 
        <div className='w-[100%] h-[100%]'>
        <h2 className='text-yellow-500 text-lg text-uppercase text-center py-2'>top of the month</h2>      
        <Carousel data-bs-theme="dark" className='flex gap-5 justify-center' activeIndex={false} onSelect={handleSelect}>
            { randomMovies?.map(group => (  
                 <Carousel.Item key={group[0].id} interval={2000}>
                    <div className='flex flex-row w-[100%] justify-around'>
                        <Link 
                            to={`/movies/${group[0].id}`} 
                            key={group[0].id}>
                            <img
                            className="h-[100%] rounded-md"
                            src={group[0].poster}
                            alt={`Poster movie ${group[0].title}`}
                            />
                        </Link>
                        <Link 
                            to={`/movies/${group[1].id}`} 
                            key={group[1].id}>
                            <img
                            className="h-[100%] rounded-md"
                            src={group[1].poster}
                            alt={`Poster movie ${group[1].title}`}
                            />
                        </Link>
                        <Link 
                            to={`/movies/${group[2].id}`} 
                            key={group[2].id}>
                            <img
                            className="h-[100%] rounded-md"
                            src={group[2].poster}
                            alt={`Poster movie ${group[2].title}`}
                            />
                        </Link>
                    </div>
                </Carousel.Item>
            ))
            }
        </Carousel>
        </div>
        )}
     </div>

    )
}

