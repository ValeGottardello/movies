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
        console.log(result)
        if (result && result.data && result.data.addUser) {
            // setUser(result.data.addUser);
            
          }
    } catch (e) {
      console.error("Error:", e);
    } finally {
        handleClose(); 
    } 
}
function getPayload(token) {
  return JSON.parse(window.atob(token.split(".")[1]))
}

function getToken() {
  const token = localStorage.getItem("token")

  if (token === null) return null

  const payload = getPayload(token)

  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem(token)
    return null
  }

  return token
}

function getUser() {
  const token = getToken()
  
  if (token) {
    let user = getPayload(token)  
    return user
  } else {
    return null
  }
}

export {
    addMovie,
    checkPasswords,
    getUser
}

