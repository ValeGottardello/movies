import { useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ModalLogOut from "./ModalLogOut";

export default function NavBar({ user, setUser }) {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
  
    
    return (
      <nav>
        <ul className="flex flex-row justify-between m-5">
            <NavLink to='/'>Home</NavLink>
            { user === null ? (
                    <>
                    <Button 
                        variant="secondary" 
                        onClick={handleShow}>
                        Log out
                    </Button>
                    <ModalLogOut 
                        handleClose={handleClose} 
                        show={show} 
                        setUser={setUser}/>
                    <NavLink to='/movies/list'>My List</NavLink>
                    
                    </>
                ) : (
                    <>
                    <NavLink to='login'>Log in</NavLink>
                    </>
                )
            }

        </ul>
      </nav>
    )
}


