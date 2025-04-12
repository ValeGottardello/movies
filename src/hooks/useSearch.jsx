import { useEffect, useRef, useState } from "react"

export default function useSearch () {

    const [search, updateSearch] = useState('')
    const [error, setError] = useState(null)
    const isFirstInput = useRef(true)

    useEffect(() => { 
        if (isFirstInput.current) {
            // isFirstInput.current = search === ""
            isFirstInput.current = false
            return
        }
        if (search === "") {
            setError("Enter the name of the movie")
            return
        }
        if (search.match(/^\d+$/)) {
            setError("Cannot start with digits")
            return
        }
        if (search.length < 3) {
            setError("Need at least 3 characters")
            return
        }
        setError(null)
        
    }, [search])

    return { search, updateSearch, error }
}