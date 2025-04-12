import debounce from "just-debounce-it";
import { useCallback } from "react";


export function useDebounce({ getMovies }) {
    const debounceGetMovies = useCallback(    
        debounce(search => {
            getMovies(search)
        },300), [getMovies])

    return { debounceGetMovies }
}