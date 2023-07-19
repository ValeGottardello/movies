import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ModalAddList from "../components/ModalAddList";
import StarRating from "../components/StarRating";
import useDetails from "../hooks/useDetails"
import { Spinner } from "react-bootstrap";
import ModalRemoveList from "../components/ModalRemoveList";

export default function MovieDetailPage ({ loading, setLoading, user }) {

    let { movieId } = useParams()
    const { movie } = useDetails({ movieId, setLoading })
    const [added, setAdded] = useState({})

    useEffect(() => {

        console.log(user.list)
    },[user])
    console.log(user.list)
    return (
        <div className="flex flex-col justify-center py-4 min-h-[80vh]">
            {loading ? (
                 <div className="self-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                movie && (
                <div className="w-[78%] mx-auto sm:rounded-lg relative bg-white ring-1 ring-gray-900/5 shadow-xl px-6 pt-4 pb-8 flex">
                    <div className="flex flex-row justify-around">
                        <img src={movie.poster} className='' alt={`image of movie ${movie.title}`} />
                        <div className="flex flex-col h-max w-[65%] divide-y divide-gray-300/50 ">
                            <div className="justify-between pb-3 flex flex-row">
                                <StarRating rating={movie.rated}/>
                                {user && ( user.list.find  
                                    ? <ModalAddList movie={movie} user={user} onSet={setAdded}/>
                                    : <ModalRemoveList movie={movie} user={user} onSet={setAdded}/>   
                                )}
                            </div>
                            <div className="flex flex-col justify-between gap-3">
                                    <h2 className="text-2xl">{movie.title}</h2>
                                    <h3>Director: {movie.director}</h3>
                                    <h4>Cast: {movie.actors}</h4>
                                    <h5>Genre: {movie.genre}</h5>
                                    <p>{movie.released}</p>
                                    <p className="first-letter:text-8xl first-letter:font-bold first-letter:text-black first-letter:mr-2 first-letter:float-left">
                                    {movie.plot && movie.plot.split(" ").length > 130 ? (
                                        <>
                                        {movie.plot.split(" ").slice(0, 130).join(" ")} ... 
                                        </>
                                    ) : (
                                        movie.plot
                                    )}
                                    </p>
                                    <p>Awards: {movie.awards === "N/A" ? "None" : movie.awards} </p>
                                <div className="flex flex-row justify-between gap-3">
                                    <p>Ranking: <span>{movie.rated === "N/A" ? "Unknown" : movie.rated}</span></p>
                                    <p>Reviews: <span>{movie.votes}</span></p>
                                    <p>Source: <span>Imbd</span></p>
                                    <p>Box Office: <span>{movie.boxOffice === "N/A" ? "Unknown" : movie.boxOffice} </span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )
                )}   
        </div>
    )
}




{/* {showFullDescription
                                        ? movie.plot
                                        : `${movie.plot.split(' ').slice(0, 90).join(' ')} ... `}
                                        {!showFullDescription && (
                                        <span onClick={handleReadMoreClick} className="read-more-link">
                                            Read more
                                        </span>
                                        )} */}