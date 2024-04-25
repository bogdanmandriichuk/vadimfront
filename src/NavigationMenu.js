import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Login from './Login';

function NavigationMenu() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [authenticated, setAuthenticated] = useState(false); // Додано статус авторизації

    const handleShowLoginModal = () => {
        setShowLoginModal(true);
    };

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    };

    const handleLogin = (password) => {
        // Перевірка секретного ключа та авторизація
        // Якщо авторизація успішна, встановлюємо статус авторизації в true
        if (password === '1111') { // Замініть 'your_secret_key' на ваш секретний ключ
            setAuthenticated(true);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">Мій сайт з альбомами</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/listened">Те, що прослухав</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/to-listen">Те, що треба прослухати</Link>
                        </li>
                        {authenticated && ( // Відображаємо "Додати альбом" тільки для авторизованих користувачів
                            <li className="nav-item">
                                <Link className="nav-link" to="/add-album">Додати альбом</Link>
                            </li>
                        )}
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Button variant="outline-primary" onClick={handleShowLoginModal}>
                                Увійти
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
            <Login show={showLoginModal} handleClose={handleCloseLoginModal} handleLogin={handleLogin} />
        </nav>
    );
}

export default NavigationMenu;
