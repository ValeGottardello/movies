// import { useList } from '../graphql/custom-hooks'

import { useEffect, useState } from "react"
import { Accordion } from "react-bootstrap"
import { Link } from "react-router-dom"
import Pages from "../components/Pagination"

export default function MyList ({ user }) {

    const [listOfMovies, setListOfMovies] = useState([])

    useEffect(() => {
        if (user) setListOfMovies(user.list)
    }, [user])
    
    console.log(listOfMovies.map(movie => movie.plot.split(" ").length))
    return (
        <>
        {user && (
            <div className="flex flex-col mt-5">
                <div className="w-[80%] mx-auto sm:rounded-lg relative bg-yellow-100 shadow-xl px-6 pt-4 pb-8 flex">
                    <ul className="movies mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {listOfMovies.length === 0 
                        ?  <p>No movies on your list</p>
                        : (
                            <>
                            {listOfMovies.map(movie => (
                            <>
                            <li className='flex flex-col justify-between gap-3 h-100'>
                                <h3 className="text-yellow-900">{movie.name.split(" ").length > 8 ? `${movie.name.split(" ").slice(0, 8).join(" ")} ...` : movie.name}</h3>
                                <Link to={`/movies/${movie.omdbId}`} key={movie._id}>
                                    <img
                                        className="sm:h-[320px] md:h-[360px] lg:h-[400px]"
                                        src={movie.img}
                                        alt={`poster of the ${movie.name} movie`} />
                                </Link>
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header className="bg-yellow-100 border">Read description</Accordion.Header>
                                        <Accordion.Body className="bg-yellow-100 border">
                                        {movie.plot === "N/A" 
                                        ? null
                                        : ( movie.plot.split(" ").length > 30 ? movie.plot.split(" ").slice(0,30).join(" ") + "..." : movie.plot )}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </li>    
                            </>
                            ))}
                            </>
                        )}
                    </ul>
                </div>
                <div className="self-center my-4">
                   
                </div>
            </div>
        )}
        </>
    )    
}


// {listOfMovies.map(movie => { 
   
// })}