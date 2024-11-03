// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListenedPage from './ListenedPage';
import ToListenPage from './ToListenPage';
import NavigationMenu from './NavigationMenu';
import AddAlbumForm from './AddAlbumForm';

import 'bootstrap/dist/css/bootstrap.min.css';
import AlbumDetailsPage from "./AlbumDetailsPage";

function App() {
    const [authenticated, setAuthenticated] = useState(false); // Додайте змінну authenticated

    const handleAuthentication = (value) => {
        setAuthenticated(value);
    };

    return (
        <Router>
            <div>
                <NavigationMenu isAuthenticated={authenticated} onAuthentication={handleAuthentication} /> {/* Передайте пропс isAuthenticated */}
                <Routes>
                    <Route path="/listened" element={<ListenedPage isAuthenticated={authenticated} />} />
                    <Route path="/to-listen" element={<ToListenPage isAuthenticated={authenticated} />} />
                    <Route path="/add-album" element={<AddAlbumForm />} /> {/* Додайте новий маршрут */}
                    <Route path="/album/:id" element={<AlbumDetailsPage isAuthenticated={authenticated}/>} />


                </Routes>
            </div>
        </Router>
    );
}

export default App;
