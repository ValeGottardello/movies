import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useOldUser } from "../graphql/custom-hooks";

export default function ModalLogIn ({ handleClose, show, setUser, user }) {

    const [query, setQuery] = useState("")
    const navigate = useNavigate()
    const [createSession, { data, loading, error }] = useOldUser();

    const handleChange = ({ target }) => {
        setQuery({ ...query, [target.name]: target.value })
    }
    const handleLogIn = async (event) => {
        event.preventDefault()
        const { email, password } = query
    
        try {
            const result = await createSession({
                variables: {
                    email,
                    password
                }
            })
            console.log(result, result.data)

            
            if (result && result.data) {
                setUser(result.data.login);
                console.log(result.data.login);
                navigate("/movies/list");
              }
        } catch (e) {
          console.error("Error:", e);
        } finally {
            setQuery("");
            handleClose(); 
            console.log(user)
        }  

    }


    return (
        <Modal 
        show={show} 
        onHide={handleClose}>
            <Modal.Header closeButton className="bg-slate-600">
                <Modal.Title className="text-uppercase text-yellow-400">Log In</Modal.Title>
            </Modal.Header>
            <Form onChange={handleChange}>
                <Modal.Body className="bg-slate-200">
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="name@example.com" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" />
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer className="bg-slate-300 justify-between">
                    <Button 
                        className="bg-yellow-600 border border-l-yellow-800"
                        variant="secondary" 
                        onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button 
                        className="bg-yellow-600 border border-l-yellow-800"
                        variant="secondary" 
                        onClick={handleLogIn}>
                        Login
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}