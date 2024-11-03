import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AddAlbumForm() {
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [country, setCountry] = useState('');
    const [youtubeLink, setYoutubeLink] = useState(''); // Стан для YouTube посилання
    const [year, setYear] = useState(null);
    const [listened, setListened] = useState('1'); // Встановлюємо значення за замовчуванням
    const [coverFile, setCoverFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddAlbum = () => {
        console.log('YouTube Link:', youtubeLink);
        const formData = new FormData();
        formData.append('artist', artist);
        formData.append('album', album);
        formData.append('country', country);
        formData.append('youtube_link', youtubeLink ? youtubeLink : ''); // Додаємо YouTube посилання
        formData.append('year', year ? year.getFullYear() : '');
        formData.append('listened', listened);
        formData.append('cover', coverFile);

        axios.post('http://localhost:3001/api/albums', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': '1111' // Ваш секретний ключ
            }
        })
            .then(response => {
                console.log(response.data);
                // Очистка полів після успішного додавання
                setArtist('');
                setAlbum('');
                setCountry('');
                setYoutubeLink(''); // Очищуємо YouTube посилання
                setYear(null);
                setListened('1'); // Встановлюємо значення за замовчуванням
                setCoverFile(null);
                setErrorMessage('');
            })
            .catch(error => {
                console.error('Помилка додавання альбому:', error);
                if (error.response && error.response.status === 401) {
                    setErrorMessage('Не авторизований. Будь ласка, увійдіть.');
                } else {
                    setErrorMessage('Помилка додавання альбому. Будь ласка, спробуйте пізніше.');
                }
            });
    };

    const handleCoverChange = (e) => {
        setCoverFile(e.target.files[0]);
    };

    return (
        <Container>
            <h1 className="mt-4 mb-4">Додати альбом</h1>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form>
                <Form.Group controlId="artist">
                    <Form.Label>Виконавець</Form.Label>
                    <Form.Control type="text" value={artist} onChange={e => setArtist(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="album">
                    <Form.Label>Назва альбому</Form.Label>
                    <Form.Control type="text" value={album} onChange={e => setAlbum(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label>Країна</Form.Label>
                    <Form.Control type="text" value={country} onChange={e => setCountry(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="youtubeLink">
                    <Form.Label>Посилання на YouTube</Form.Label>
                    <Form.Control
                        type="text"
                        value={youtubeLink}
                        onChange={e => setYoutubeLink(e.target.value)} // Оновлення стану
                        placeholder="Введіть YouTube посилання"
                    />
                </Form.Group>
                <Form.Group controlId="year">
                    <Form.Label>Рік</Form.Label>
                    <br />
                    <DatePicker
                        selected={year}
                        onChange={date => setYear(date)}
                        dateFormat="yyyy"
                        showYearPicker
                    />
                </Form.Group>
                <Form.Group controlId="listened">
                    <Form.Label>Статус</Form.Label>
                    <Form.Control as="select" value={listened} onChange={e => setListened(e.target.value)}>
                        <option value="1">Прослухано</option>
                        <option value="2">Треба прослухати</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="cover">
                    <Form.Label>Обкладинка альбому</Form.Label>
                    <Form.Control type="file" onChange={handleCoverChange} />
                </Form.Group>
                <Button variant="primary" onClick={handleAddAlbum}>
                    Додати альбом
                </Button>
            </Form>
        </Container>
    );
}

export default AddAlbumForm;
