import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AiOutlineHeart } from "react-icons/ai";
import { useUser } from "../graphql/custom-hooks";

export default function ModalRemoveList ({ user, movie, setMessage }) {
    
    const [show, setShow] = useState(false)
    const [ createUser ] = useUser();

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleAddorRemove = async () => {
        try {
            // const result = await createUser({
            //   variables: {
            //     movie: {
            //         cast: [],
            //         img: movie.poster,
            //         name: null,
            //         plot: null
            //       },
            //     userId: user._id
            //   }
            // })
            
        } catch (e) {
          console.error("Error:", e);
        } finally {
            handleClose(); 
        }  
    }
    return (
        <>
        <Button onClick={handleShow} className="bg-transparent border  hover:border-red-600 ">
            <AiOutlineHeart className="hover:text-transparent border border-slate-900 text-2xl text-red-600 "/>
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
                    onClick={handleAddorRemove}>
                    Yes
                </Button>
            </Modal.Footer>
      </Modal>
     </>
    )
}