import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ModalAddList from "../components/ModalAddList";
import StarRating from "../components/StarRating";
import useDetails from "../hooks/useDetails"

export default function MovieDetailPage ({ loading, setLoading, user }) {

    let { movieId } = useParams()
    const { movie } = useDetails({ movieId, setLoading })

    return (
        <div className="flex flex-col justify-center py-4 min-h-[80vh]">
            { loading ? (
                <p>Loading...</p>
            ) : (
                movie && (
                <div className="w-[78%] mx-auto sm:rounded-lg relative bg-white ring-1 ring-gray-900/5 shadow-xl px-6 pt-4 pb-8 flex">
                    <div className="flex flex-row gap-5">
                        <img src={movie.poster} className='' alt={`image of movie ${movie.title}`} />
                        <div className="flex flex-col h-max w-[65%] divide-y divide-gray-300/50 ">
                            <div className="justify-between pb-3">
                                <StarRating rating={movie.rated}/>
                                {user && (
                                    <ModalAddList id={movieId} user={user}/>
                                )}
                            </div>
                            <div className="flex flex-col justify-between gap-3">
                                    <h2 className="text-2xl">{movie.title}</h2>
                                    <h3>Director: {movie.director}</h3>
                                    <h4>Cast: {movie.actors}</h4>
                                    <h5>Genre: {movie.genre}</h5>
                                    <p>{movie.released}</p>
                                    <p className="first-letter:text-8xl first-letter:font-bold first-letter:text-black first-letter:mr-2 first-letter:float-left">{movie.plot}</p>
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

