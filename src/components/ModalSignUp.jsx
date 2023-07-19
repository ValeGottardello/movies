import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";

import { checkPasswords } from "../helpers/helpers";
import { useUser } from "../graphql/custom-hooks";


export default function ModalSignUp ({ handleClose, show, setUser }) {

    const [query, setQuery] = useState("")
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()
    const [ createUser ] = useUser();

    const handleSignUp = async (event) => {
        event.preventDefault()
        const { name, email, password } = query
    
        try {
            const result = await createUser({
              variables: {
                name,
                email,
                password
              }
            })
            if (result && result.data && result.data.addUser) {
                setUser(result.data.addUser);
                console.log(result.data.addUser);
                navigate("/movies/list");
              }
        } catch (e) {
          console.error("Error:", e);
        } finally {
            setQuery("");
            setMessage(null);
            handleClose(); 
        }  

    }
    
    const handleChange = ({ target }) => {
        setQuery({ ...query, [target.name]: target.value })
    }

    useEffect(() => {

        setMessage(null)
        if (query.confirmPassword) { 
            checkPasswords(query,setMessage)
        }
     
    }, [query])

    
    return (
        <Modal 
            show={show} 
            onHide={handleClose}>
                <Modal.Header closeButton className="bg-slate-600">
                    <Modal.Title className="text-uppercase text-yellow-400">Sign Up</Modal.Title>
                </Modal.Header>
                <Form onChange={handleChange}>
                    <Modal.Body className="bg-slate-200">
                            <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="name" name="name" placeholder="John Dalton" required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name="email" placeholder="name@example.com" required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Password" required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control type="password" name="confirmPassword" placeholder="Confirm Password" required/>
                            </Form.Group>
                            {message && 
                            <>
                                {message.error ? (
                                    <Form.Text className="text-red-700" >
                                        {message.error}
                                    </Form.Text>
                                ) : (
                                    <Form.Text className="text-green-700" >
                                        {message.success}
                                    </Form.Text>
                                )}
                            </>
                            }
                    </Modal.Body>
                    <Modal.Footer className="bg-slate-300 justify-between">
                    <Button 
                        className="bg-yellow-600 border border-l-yellow-800"
                        variant="secondary" 
                        onClick={() => {
                            handleClose()
                            setMessage(null)
                            setUser('')
                        }}>
                        Cancel
                    </Button>
                    <Button 
                        disabled={message?.success && query?.email && query?.name ? false : true}
                        className="bg-yellow-600 border border-yellow-800"
                        variant="secondary" 
                        onClick={handleSignUp}>
                        Sign
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}