import React, { useState } from 'react';
import './AddCompany.css';

function AddCompany({ onClose, showSuccessPopup }) {
    const [companyName, setCompanyName] = useState('');

    const handleChange = (e) => {
        setCompanyName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ADDRESS}/company`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ name: companyName })
            });

            if (response.ok) {
                setCompanyName('');
                showSuccessPopup('Компания успешно добавлена!');
                onClose();
            } else {
                const errorData = await response.json();
                alert('Ошибка: ' + errorData.detail);
            }
        } catch (error) {
            console.error('Ошибка при добавлении компании:', error);
        }
    };

    return (
        <div className="add-company-container">
            <h2>Добавить компанию</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="companyName"
                    value={companyName}
                    onChange={handleChange}
                    placeholder="Название компании"
                    required
                />
                <button type="submit">Добавить</button>
                <button type="button" onClick={onClose}>Закрыть</button>
            </form>
        </div>
    );
}

export default AddCompany;
