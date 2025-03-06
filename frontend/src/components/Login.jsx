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

const LoginForm = () => {  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const Login = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/auth/login", {
                username: username,
                password: password
            });

            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container fluid="md" className="d-flex justify-content-center align-items-center min-vh-100 "> 
            <Row className="justify-content-center align-items-center w-100 ">
                <Col xs={4}> 
                    <h1 className="text-start mb-5 fw-bold">Login</h1>
                    <Form onSubmit={Login} className=" mb-3">

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
    
                    <span className="text-muted">Belum Punya Akun? <Link to="/">Register</Link></span>
                    <div className="text-end">
                        <Button variant="danger" type="submit" className=" mt-3 w-20">
                            Login
                        </Button>
                    </div>
                        
                    </Form>            
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;