import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

const ListenedPage = ({ isAuthenticated }) => {
    const [albums, setAlbums] = useState([]);
    const [selectedSortOption, setSelectedSortOption] = useState('album');
    const [searchArtist, setSearchArtist] = useState('');
    const [searchAlbum, setSearchAlbum] = useState('');
    const [searchCountry, setSearchCountry] = useState('');
    const [searchYear, setSearchYear] = useState('');

    useEffect(() => {
        fetchListenedAlbums();
    }, [selectedSortOption, searchArtist, searchAlbum, searchCountry, searchYear]);

    const fetchListenedAlbums = () => {
        axios.get(`http://localhost:3002/api/albums?type=listened&sort=${selectedSortOption}&searchArtist=${searchArtist}&searchAlbum=${searchAlbum}&searchCountry=${searchCountry}&searchYear=${searchYear}`)
            .then(response => {
                setAlbums(response.data);
            })
            .catch(error => {
                console.error('Помилка отримання даних:', error);
            });
    };

    const handleSortChange = (e) => {
        setSelectedSortOption(e.target.value);
    };

    const handleSearchArtistChange = (e) => {
        setSearchArtist(e.target.value);
    };
    const handleSearchAlbumChange = (e) => {
        setSearchAlbum(e.target.value);
    };
    const handleSearchCountryChange = (e) => {
        setSearchCountry(e.target.value);
    };
    const handleSearchYearChange = (e) => {
        setSearchYear(e.target.value);
    };

    const handleDeleteAlbum = (id) => {
        if (isAuthenticated) {
            axios.delete(`http://localhost:3002/api/albums/${id}`, {
                headers: {
                    Authorization: '1111' // Замініть на свій секретний ключ
                }
            })
                .then(response => {
                    setAlbums(albums.filter(album => album.id !== id));
                })
                .catch(error => {
                    console.error('Помилка видалення альбому:', error);
                });
        } else {
            console.log('Вибачте, ви повинні увійти, щоб видалити альбом.');
        }
    };

    const handleMoveToToListen = (albumId) => {
        if (isAuthenticated) {
            axios.put(`http://localhost:3002/api/move-to-to-listen/${albumId}`, null, {
                headers: {
                    Authorization: "1111" // Замініть на ваш авторизаційний токен
                }
            })
                .then(response => {
                    setAlbums(albums.filter(album => album.id !== albumId));
                })
                .catch(error => {
                    console.error('Помилка переміщення альбома:', error);
                });
        } else {
            console.log('Вибачте, ви повинні увійти, щоб перемістити альбом.');
        }
    };

    return (
        <Container>
            <h1 className="mt-4 mb-4">Те, що вже прослухав</h1>
            <Form.Group>
                <Form.Label>Пошук за виконавцем:</Form.Label>
                <Form.Control type="text" value={searchArtist} onChange={handleSearchArtistChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Пошук за альбомом:</Form.Label>
                <Form.Control type="text" value={searchAlbum} onChange={handleSearchAlbumChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Пошук за країною:</Form.Label>
                <Form.Control type="text" value={searchCountry} onChange={handleSearchCountryChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Пошук за роком:</Form.Label>
                <Form.Control type="number" value={searchYear} onChange={handleSearchYearChange} />
            </Form.Group>
            <div className="d-flex flex-wrap">
                {albums.map(album => (
                    <Card key={album.id} style={{ width: '18rem', margin: '10px' }}>
                        <Link to={`/album/${album.id}`}>
                            <Card.Img variant="top" src={album.cover} alt="Обкладинка" />
                            <Card.Body>
                                <Card.Title>{album.album}</Card.Title>
                                <Card.Text>
                                    <strong>Виконавець:</strong> {album.artist}
                                </Card.Text>
                            </Card.Body>
                        </Link>
                        <Card.Body>
                            <Card.Text>
                                <strong>Країна:</strong> {album.country}<br />
                                <strong>Рік:</strong> {album.year}<br />
                                <a href={album.youtube_link} target="_blank" rel="noopener noreferrer">YouTube</a>
                            </Card.Text>
                            {isAuthenticated && (
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <Button variant="danger" onClick={() => handleDeleteAlbum(album.id)}>Видалити</Button>
                                    <Button variant="primary" onClick={() => handleMoveToToListen(album.id)}>Слухати ще</Button>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
};

export default ListenedPage;
