import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import {uploadedImageState} from '@/atoms';

const ImageUploadWithLimit = () => {
    const [error, setError] = useState('');
    const MAX_SIZE = 2 * 1024 * 1024; // Максимальный размер 2MB (в байтах)
    const [bgImage, setBgImage] = useRecoilState(uploadedImageState);

    const deleteBgImage = () => {
        setBgImage('');
        localStorage.setItem('uploadedImage', '');
    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Проверяем размер файла
            if (file.size > MAX_SIZE) {
                setError('Размер файла превышает 2MB. Выберите другое изображение.');
                return;
            }
            setError(''); // Сбрасываем ошибку, если файл подходит
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result;
                setBgImage(base64Image);
                localStorage.setItem('uploadedImage', base64Image); // Сохраняем в Local Storage
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <h3>Картинка на фоне (максимум 2MB):</h3>
            <input type="file" accept="image/*" onChange={handleImageUpload}/>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Выводим ошибку */}
            {bgImage && (
                <div>
                    <img src={bgImage} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' , maxHeight: '100px'}} />
                </div>
            )}
            <button onClick={deleteBgImage} style={{'margin-top': '10px'}}>Убрать изображение</button>
        </>
    );
};

export default ImageUploadWithLimit;
