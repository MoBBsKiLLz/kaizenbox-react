import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import logo from '../assets/logo.png';
import  '../App.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/facilities');
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center auth-background" style={{ minHeight: '100vh'}}>
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <div className="text-center mb-4">
            <img src={logo} alt="Logo" style={{ height: '200px' }} />
          </div>
          <div className="bg-light p-4 rounded shadow-sm">
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="username" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            <div className="text-center mt-3">
              <p>
                Don't have an account?{' '}
                <a href="/register" className="text-decoration-none">
                  Register here
                </a>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
