function checkPasswords (query, setMessage) {

    const {password, confirmPassword} = query

    if (password !== confirmPassword || password === "") {
        setMessage({ error: "Passwords doesn't match" })
    } else {
        console.log(password, confirmPassword)
        setMessage({ success: "Passwords match" })
    }
}

async function addMovie(movie, id) {
    try {
        const result = await createUser({
          variables: {
            movie: {
                cast: [],
                img: movie.poster,
                name: null,
                plot: null
              },
            userId: user._id
          }
        })
        if (result && result.data && result.data.addUser) {
            setUser(result.data.addUser);
          }
    } catch (e) {
      console.error("Error:", e);
    } finally {
        handleClose(); 
    } 
}

export {
    addMovie,
    checkPasswords
}