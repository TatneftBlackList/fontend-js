import React, { useState, useEffect } from 'react';
import './UpdateUser.css';

function UpdateUser({ onClose, showSuccessPopup }) {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState('');
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        job_number: '',
        login: '',
        password: '',
        roleID: '',
        permissions_id: []
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        // Fetch users list
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ADDRESS}/users`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `${token}`
                    }
                });
                const data = await response.json();
                setUsers(Array.isArray(data) ? data : []); // Ensure data is an array
            } catch (error) {
                console.error('Ошибка при получении пользователей:', error);
            }
        };

        fetchUsers();
    }, [token]);

    useEffect(() => {
        if (userId) {
            // Fetch user data by ID and populate formData
            const fetchUserData = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ADDRESS}/users/${userId}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `${token}`
                        }
                    });
                    const data = await response.json();
                    setFormData({
                        first_name: data.first_name,
                        last_name: data.last_name,
                        job_number: data.job_number,
                        login: data.login,
                        password: '',
                        roleID: data.roleID,
                        permissions_id: data.permissions_id || []
                    });
                } catch (error) {
                    console.error('Ошибка при получении данных пользователя:', error);
                }
            };

            fetchUserData();
        }
    }, [userId, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePermissionChange = (e) => {
        const { value, checked } = e.target;
        const selectedPermissions = formData.permissions_id;
        if (checked) {
            setFormData({ ...formData, permissions_id: [...selectedPermissions, Number(value)] });
        } else {
            setFormData({ ...formData, permissions_id: selectedPermissions.filter((perm) => perm !== Number(value)) });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ADDRESS}/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                showSuccessPopup('Пользователь успешно обновлен!');
                onClose();
            } else {
                const errorData = await response.json();
                alert('Ошибка: ' + errorData.detail);
            }
        } catch (error) {
            console.error('Ошибка при обновлении пользователя:', error);
        }
    };

    return (
        <div className="update-user-container">
            <h2>Обновить пользователя</h2>
            <select
                name="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
            >
                <option value="">Выберите пользователя</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                        {user.first_name} {user.last_name}
                    </option>
                ))}
            </select>
            {userId && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="Имя"
                        required
                    />
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Фамилия"
                        required
                    />
                    <input
                        type="text"
                        name="job_number"
                        value={formData.job_number}
                        onChange={handleChange}
                        placeholder="Табельный номер"
                        required
                    />
                    <input
                        type="email"
                        name="login"
                        value={formData.login}
                        onChange={handleChange}
                        placeholder="Эл. почта"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Пароль"
                    />
                    <select
                        name="roleID"
                        value={formData.roleID}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Выберите роль</option>
                        <option value="1">Администратор</option>
                        <option value="2">Пользователь</option>
                    </select>
                    <div className="permissions">
                        <label>
                            <input
                                type="checkbox"
                                value="1"
                                checked={formData.permissions_id.includes(1)}
                                onChange={handlePermissionChange}
                            />
                            Добавление заблокированных пользователей
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="2"
                                checked={formData.permissions_id.includes(2)}
                                onChange={handlePermissionChange}
                            />
                            Удаление заблокированных пользователей
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="3"
                                checked={formData.permissions_id.includes(3)}
                                onChange={handlePermissionChange}
                            />
                            Обновление заблокированных пользователей
                        </label>
                    </div>
                    <button type="submit">Обновить</button>
                    <button type="button" onClick={onClose}>Закрыть</button>
                </form>
            )}
        </div>
    );
}

export default UpdateUser;
