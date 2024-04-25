import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Form } from 'react-bootstrap';

const ToListenPage = () => {
    const [albums, setAlbums] = useState([]);
    const [selectedSortOption, setSelectedSortOption] = useState('album');
    const [searchArtist, setSearchArtist] = useState('');
    const [searchAlbum, setSearchAlbum] = useState('');
    const [searchCountry, setSearchCountry] = useState('');
    const [searchYear, setSearchYear] = useState('');

    useEffect(() => {
        fetchToListenAlbums();
    }, [selectedSortOption, searchArtist, searchAlbum, searchCountry, searchYear]);

    const fetchToListenAlbums = () => {
        axios.get(`http://localhost:3001/api/albums?type=to-listen&sort=${selectedSortOption}&searchArtist=${searchArtist}&searchAlbum=${searchAlbum}&searchCountry=${searchCountry}&searchYear=${searchYear}`)
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

    return (
        <Container>
            <h1 className="mt-4 mb-4">Те, що треба прослухати</h1>
            {/*<Form.Group controlId="sortSelect">*/}
            {/*    <Form.Label>Сортувати за:</Form.Label>*/}
            {/*    <Form.Control as="select" value={selectedSortOption} onChange={handleSortChange}>*/}
            {/*        <option value="album">Назва альбому</option>*/}
            {/*        <option value="artist">Виконавець</option>*/}
            {/*        <option value="year">Рік</option>*/}
            {/*        <option value="country">Країна</option>*/}
            {/*    </Form.Control>*/}
            {/*</Form.Group> */}
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
                        <Card.Img variant="top" src={album.cover} alt="Обкладинка" />
                        <Card.Body>
                            <Card.Title>{album.album}</Card.Title>
                            <Card.Text>
                                <strong>Виконавець:</strong> {album.artist}<br />
                                <strong>Країна:</strong> {album.country}<br />
                                <strong>Рік:</strong> {album.year}<br />
                                <a href={album.youtube_link} target="_blank" rel="noopener noreferrer">YouTube</a>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
};

export default ToListenPage;
