import { useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ModalLogOut from "./ModalLogOut";
import ModalLogIn from "./ModalLogIn";
import ModalSignUp from "./ModalSignUp";

export default function NavBar({ user, setUser }) {
    const [showSignUp, setShowSignUp] = useState(false)
    const [showLogIn, setShowLogIn] = useState(false)
    const [showLogOut, setShowLogOut] = useState(false)

    const handleClose = () => {
        setShowSignUp(false)
        setShowLogIn(false)
        setShowLogOut(false)
    }

    const handleShowSignUp = () => setShowSignUp(true)
    const handleShowLogIn = () => setShowLogIn(true)
    const handleShowLogOut = () => setShowLogOut(true)
    
    
    return (
      <nav className="bg-yellow-500">
        <ul className="flex flex-row justify-between m-3">
            <NavLink to='/'>    
                <h1 className="text-slate-800 text-5xl text-uppercase py-2">movies</h1>
            </NavLink>
            { user && <h2 className="text-slate-800 text-xl text-uppercase py-3">Hello {user.name}</h2>}
            <div className="flex gap-4">
                <NavLink to='/'>    
                    <Button 
                        className='h-[60px]'
                        variant="secondary">                            
                        Home
                    </Button>
                </NavLink>
                { user ? (
                    <>
                    <Button 
                        className='h-[60px]'
                        variant="secondary" 
                        onClick={handleShowLogOut}>
                        Log out
                    </Button>
                    <NavLink to='/movies/list'>    
                        <Button 
                            className='h-[60px]'
                            variant="secondary">                            
                            My List
                        </Button>
                    </NavLink>
                    <ModalLogOut 
                        handleClose={handleClose} 
                        show={showLogOut} 
                        setUser={setUser}/>
                </>
                ) : (
                    <>
                        <Button 
                            className='h-[60px]'
                            variant="secondary" 
                            onClick={handleShowLogIn}>
                            Log In
                        </Button>
                        <ModalLogIn 
                            handleClose={handleClose} 
                            show={showLogIn} 
                            setUser={setUser}
                            user={user}/>
                        <Button 
                            className='h-[60px]'
                            variant="secondary" 
                            onClick={handleShowSignUp}>
                            Sign Up
                        </Button>
                        <ModalSignUp 
                            handleClose={handleClose} 
                            show={showSignUp} 
                            setUser={setUser}
                            />
                    </>
                    )
                }
            </div>
        </ul>
      </nav>
    )
}


