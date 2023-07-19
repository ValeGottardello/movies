import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsFillHeartFill } from "react-icons/bs";
import { useAddMovie } from "../graphql/custom-hooks";

export default function ModalAddList ({ user, movie, onSet }) {
    
    const [show, setShow] = useState(false)
    const handleAddMovie = useAddMovie()


    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleAdd = async () => {
        try {
            await handleAddMovie(movie, user._id)
        } catch (e) {
            console.error('Error:', e);
        } finally {
            handleClose();
        }   
    }   
    
    return (
        <>
        <Button onClick={handleShow} className="bg-transparent border  hover:border-red-600 ">
            <BsFillHeartFill className="text-slate-900 text-2xl hover:text-red-600 "/>
        </Button>
        <Modal 
            show={show} 
            onHide={handleClose}>
            <Modal.Header closeButton >
                <Modal.Title>Do you want add this movie to your list?</Modal.Title>
                </Modal.Header>
                <Modal.Body>This will apear in a general list which then you can organise.</Modal.Body>
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
                    onClick={handleAdd}>
                    Yes
                </Button>
            </Modal.Footer>
      </Modal>
     </>
    )
}