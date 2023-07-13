import { Button, Modal } from "react-bootstrap";

export default function ModalAddList ({ id, user }) {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleAdd = () => {

    }
    return (
        <>
        <Button onClick={handleShow}>
        {/* heart icon */}
        </Button>
        <Modal 
            show={show} 
            onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Do you want add this movie to your list?</Modal.Title>
                </Modal.Header>
                <Modal.Body>This will apear in a general list which then you can organise.</Modal.Body>
                <Modal.Footer>
                <Button 
                    variant="secondary" 
                    onClick={handleClose}>
                    No
                </Button>
                <Button 
                    variant="secondary" 
                    onClick={handleAdd}>
                    Yes
                </Button>
            </Modal.Footer>
      </Modal>
        </>
    )
}