import { Button, Modal } from "react-bootstrap";

export default function ModalLogOut ({ handleClose, show, setUser }) {

    const handleLogOut = () => {
        handleClose()
        setUser('')
    }

    return (
        <Modal 
            show={show} 
            onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Log Out</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure do you want to log out from your account?</Modal.Body>
                <Modal.Footer>
                <Button 
                    variant="secondary" 
                    onClick={handleClose}>
                    No
                </Button>
                <Button 
                    variant="secondary" 
                    onClick={handleLogOut}>
                    Yes
                </Button>
            </Modal.Footer>
      </Modal>
    )
}