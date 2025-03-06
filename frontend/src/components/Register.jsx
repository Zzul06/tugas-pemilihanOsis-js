import React from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/auth/register", {
                email: email,
                username: username,
                password: password
            });
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container fluid="md" className="d-flex justify-content-center align-items-center min-vh-100 "> 
            <Row className="justify-content-center align-items-center w-100 ">
                <Col xs={4}> 
                    <h1 className="text-start mb-5 fw-bold">Register</h1>
                    <Form onSubmit={Register} className=" mb-3">

                    <Form.Floating className="mb-3 flex-grow-1">
                        <Form.Control 
                        id="floatingInputCustom" 
                        type="text" 
                        placeholder="" 
                        onChange={(e) => setEmail(e.target.value)}/>
                        <label htmlFor="floatingInputCustom">Email</label>
                    </Form.Floating>

                    <Form.Floating className="mb-3 flex-grow-1">
                        <Form.Control 
                        id="floatingUsernameCustom" 
                        type="text" 
                        placeholder="" 
                        onChange={(e) => setUsername(e.target.value)}/>
                        <label htmlFor="floatingUsernameCustom">Username</label>
                    </Form.Floating>

                    <Form.Floating className="mb-3 flex-grow-1">
                        <Form.Control 
                        id="floatingPasswordCustom" 
                        type="password" 
                        placeholder="" 
                        onChange={(e) => setPassword(e.target.value)}/>
                        <label htmlFor="floatingPasswordCustom">Password</label>
                    </Form.Floating>
    

                    <span className="text-muted">Sudah Punya Akun? <Link to="/login">Login</Link></span>
                    <div className="text-end">
                        <Button variant="danger" type="submit" className=" mt-3 w-20">
                            Register
                        </Button>
                    </div>
                        
                    </Form>            
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterForm;