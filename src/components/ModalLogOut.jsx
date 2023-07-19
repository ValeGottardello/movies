import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function ModalLogOut ({ handleClose, show, setUser }) {
    const navigate = useNavigate()

    const handleLogOut = () => {
        handleClose()
        setUser('')
        navigate('/')
    }
    
    return (
        <Modal 
            show={show} 
            onHide={handleClose}>
                <Modal.Header closeButton className="bg-slate-600">
                    <Modal.Title className="text-uppercase text-yellow-400">Log out</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-slate-200">
                    <p>Are you sure you want to log out?</p>
                </Modal.Body>
                <Modal.Footer className="bg-slate-300 justify-between">
                    <Button 
                        className="bg-yellow-600 border border-l-yellow-800"
                        variant="secondary" 
                        onClick={handleClose}>
                        No
                    </Button>
                    <Button 
                        className="bg-yellow-600 border border-l-yellow-800"
                        variant="secondary" 
                        onClick={handleLogOut}>
                        Yes
                    </Button>
            </Modal.Footer>
      </Modal>
    )
}