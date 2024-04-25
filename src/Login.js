import React, { useState } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

function Login({ show, handleClose, handleLogin }) {
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrorMessage(''); // Очищення попередньої помилки при зміні пароля
    };

    const handleLoginClick = () => {
        axios.post('http://localhost:3001/api/login', { password: password }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    handleLogin(password);
                    setPassword('');
                }
            })
            .catch(error => {
                console.error('Помилка авторизації:', error);
                if (error.response && error.response.status === 401) {
                    setErrorMessage('Неправильний пароль. Спробуйте ще раз.');
                } else {
                    setErrorMessage('Помилка авторизації. Будь ласка, спробуйте пізніше.');
                }
            });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Логінізація</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Form.Group controlId="password">
                    <Form.Label>Секретний ключ</Form.Label>
                    <Form.Control type="password" value={password} onChange={handlePasswordChange} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрити
                </Button>
                <Button variant="primary" onClick={handleLoginClick}>
                    Увійти
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Login;
