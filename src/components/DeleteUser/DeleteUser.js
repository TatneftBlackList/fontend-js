import React, { useState, useEffect } from 'react';
import './DeleteUser.css';

function DeleteUser({ onClose, showSuccessPopup }) {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ADDRESS}/users`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `${token}`
                    }
                });
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Ошибка при получении пользователей:', error);
            }
        };

        fetchUsers();
    }, [token]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ADDRESS}/users/${selectedUserId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                showSuccessPopup('Пользователь успешно удален!');
                setUsers(users.filter(user => user.id !== selectedUserId));
                setSelectedUserId('');
                onClose();
            } else {
                const errorData = await response.json();
                alert('Ошибка: ' + errorData.detail);
            }
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
        }
    };

    return (
        <div className="delete-user-container">
            <h2>Удалить пользователя</h2>
            <select
                name="userId"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                required
            >
                <option value="">Выберите пользователя</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                        {user.first_name} {user.last_name}
                    </option>
                ))}
            </select>
            <button onClick={handleDelete}>Удалить</button>
            <button onClick={onClose}>Закрыть</button>
        </div>
    );
}

export default DeleteUser;
