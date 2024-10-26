import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const AlbumDetailsPage = () => {
    const { id: albumId } = useParams();
    const [albumData, setAlbumData] = useState(null);
    const [songList, setSongList] = useState([]);
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [newSong, setNewSong] = useState('');
    const [isEditing, setIsEditing] = useState({
        artist: false,
        album: false, // Додаємо поле для редагування назви альбому
        country: false,
        year: false,
    });

    useEffect(() => {
        fetchAlbumDetails();
    }, [albumId]);

    const fetchAlbumDetails = () => {
        axios.get(`http://localhost:3001/api/albums/${albumId}`)
            .then(response => {
                setAlbumData(response.data);
                setSongList(response.data.songs || []);
                setDescription(response.data.description || '');
            })
            .catch(error => {
                console.error('Помилка отримання даних:', error);
                setError('Помилка отримання даних. Спробуйте пізніше.');
            });
    };

    const handleSongChange = (index, newValue) => {
        const updatedSongList = [...songList];
        updatedSongList[index] = newValue;
        setSongList(updatedSongList);
    };

    const handleAddSong = () => {
        if (newSong) {
            setSongList([...songList, newSong]);
            setNewSong('');
        }
    };

    const toggleEdit = (field) => {
        setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleFieldChange = (field, value) => {
        setAlbumData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveChanges = () => {
        const updatedAlbumData = { ...albumData, songs: songList, description };
        axios.put(`http://localhost:3001/api/albums/${albumId}`, updatedAlbumData, {
            headers: {
                Authorization: '1111' // Ensure this matches your secretKey
            }
        })
            .then(response => {
                console.log('Дані про альбом успішно оновлено:', response.data);
            })
            .catch(error => {
                console.error('Помилка збереження змін:', error);
                setError('Помилка збереження змін. Спробуйте пізніше.');
            });
    };

    if (!albumData) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <h1>
                {isEditing.album ? (
                    <Form.Control
                        type="text"
                        value={albumData.album}
                        onChange={(e) => handleFieldChange('album', e.target.value)}
                    />
                ) : (
                    albumData.album
                )}
                <FaEdit onClick={() => toggleEdit('album')} style={{ cursor: 'pointer', marginLeft: '8px' }} />
            </h1>
            <Card style={{ width: '18rem', margin: '10px' }}>
                <Card.Img variant="top" src={albumData.cover} alt="Обкладинка" />
                <Card.Body>
                    <Card.Title>{albumData.album}</Card.Title>
                    <Card.Text>
                        <strong>Виконавець:</strong>
                        {isEditing.artist ? (
                            <Form.Control
                                type="text"
                                value={albumData.artist}
                                onChange={(e) => handleFieldChange('artist', e.target.value)}
                            />
                        ) : (
                            <span>{albumData.artist}</span>
                        )}
                        <FaEdit onClick={() => toggleEdit('artist')} style={{ cursor: 'pointer', marginLeft: '8px' }} /><br />

                        <strong>Країна:</strong>
                        {isEditing.country ? (
                            <Form.Control
                                type="text"
                                value={albumData.country}
                                onChange={(e) => handleFieldChange('country', e.target.value)}
                            />
                        ) : (
                            <span>{albumData.country}</span>
                        )}
                        <FaEdit onClick={() => toggleEdit('country')} style={{ cursor: 'pointer', marginLeft: '8px' }} /><br />

                        <strong>Рік:</strong>
                        {isEditing.year ? (
                            <Form.Control
                                type="number"
                                value={albumData.year}
                                onChange={(e) => handleFieldChange('year', e.target.value)}
                            />
                        ) : (
                            <span>{albumData.year}</span>
                        )}
                        <FaEdit onClick={() => toggleEdit('year')} style={{ cursor: 'pointer', marginLeft: '8px' }} /><br />

                        <strong>Пісні:</strong><br />
                        {songList.map((song, index) => (
                            <Form.Control key={index} type="text" value={song} onChange={(e) => handleSongChange(index, e.target.value)} />
                        ))}
                        <Form.Control
                            type="text"
                            placeholder="Нова пісня"
                            value={newSong}
                            onChange={(e) => setNewSong(e.target.value)}
                        />
                        <Button variant="primary" onClick={handleAddSong}>Додати пісню</Button>

                        <strong style={{ display: 'block', marginTop: '20px' }}>Опис:</strong>
                        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Card.Text>
                    <Button variant="primary" onClick={handleSaveChanges}>Зберегти зміни</Button>
                </Card.Body>
            </Card>
            {error && <Alert variant="danger">{error}</Alert>}
        </Container>
    );
};

export default AlbumDetailsPage;
