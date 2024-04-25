// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListenedPage from './ListenedPage';
import ToListenPage from './ToListenPage';
import NavigationMenu from './NavigationMenu';

import 'bootstrap/dist/css/bootstrap.min.css';
import AddAlbumForm from "./AddAlbumForm";

function App() {
    return (
        <Router>
            <div>
                <NavigationMenu />
                <Routes>
                    <Route path="/listened" element={<ListenedPage />} />
                    <Route path="/to-listen" element={<ToListenPage />} />
                    <Route path="/add-album" element={<AddAlbumForm />} /> {/* Додайте новий маршрут */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
