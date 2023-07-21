import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsFillHeartFill } from "react-icons/bs";
import { useAddMovie, useRemoveMovie } from "../graphql/custom-hooks";


export default function ModalRemoveList ({ user, movie, onSet, movie_id, added }) {
    
    const [show, setShow] = useState(false)
    const handleRemoveMovie = useRemoveMovie()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
console.log(added)
    const handleRemove = async () => {
        try {
            const removedMovie = await handleRemoveMovie(added._id)

            if (added.ombdId === removedMovie.ombdId) {
                onSet({})
            }
        } catch (e) {
            console.error('Error:', e);
        } finally {
            handleClose();
        }   
    }
    return (
        <>
        <Button onClick={handleShow} className="bg-transparent border  hover:border-black-600 ">
            <BsFillHeartFill className="text-red-600 text-2xl hover:text-red-200"/>
        </Button>
        <Modal 
            show={show} 
            onHide={handleClose}>
            <Modal.Header closeButton >
                <Modal.Title>Do you want remove this movie of your list?</Modal.Title>
                </Modal.Header>
                <Modal.Body>This will remove of your list.</Modal.Body>
                <Modal.Footer className="justify-between">
                <Button 
                    className="bg-yellow-600 border border-l-yellow-800"
                    variant="secondary" 
                    onClick={handleClose}>
                    No
                </Button>
                <Button 
                    className="bg-yellow-600 border border-l-yellow-800"
                    variant="secondary" 
                    onClick={handleRemove}>
                    Yes
                </Button>
            </Modal.Footer>
      </Modal>
     </>
    )
}