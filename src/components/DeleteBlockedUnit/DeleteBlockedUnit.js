import React from 'react';
import './DeleteBlockedUnit.css';

function DeleteBlockedUnit({ userId, onDelete, showSuccessPopup }) {
    const handleDelete = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ADDRESS}/blockedUnits/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                onDelete(userId);
                showSuccessPopup('Пользователь успешно удален!');
            } else {
                const errorData = await response.json();
                alert('Ошибка: ' + errorData.detail);
            }
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
        }
    };

    return (
        <button className="delete-button" onClick={handleDelete}>
            Удалить
        </button>
    );
}

export default DeleteBlockedUnit;
