import React, { useState } from 'react';
import './AddNewUser.css';

function AddNewUser({ onClose, showSuccessPopup }) {
    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        job_number: '',
        login: '',
        password: '',
        roleID: '',
        permissions_id: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handlePermissionChange = (e) => {
        const { value, checked } = e.target;
        const selectedPermissions = newUser.permissions_id;
        if (checked) {
            setNewUser({ ...newUser, permissions_id: [...selectedPermissions, Number(value)] });
        } else {
            setNewUser({ ...newUser, permissions_id: selectedPermissions.filter((perm) => perm !== Number(value)) });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ADDRESS}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                const data = await response.json();
                setNewUser({
                    first_name: '',
                    last_name: '',
                    job_number: '',
                    login: '',
                    password: '',
                    roleID: '',
                    permissions_id: []
                });
                showSuccessPopup('Пользователь успешно добавлен!');
                onClose();
            } else {
                const errorData = await response.json();
                alert('Ошибка: ' + errorData.detail);
            }
        } catch (error) {
            console.error('Ошибка при добавлении пользователя:', error);
        }
    };

    return (
        <div className="add-new-user-container">
            <h2>Добавить пользователя</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="first_name"
                    value={newUser.first_name}
                    onChange={handleChange}
                    placeholder="Имя"
                    required
                />
                <input
                    type="text"
                    name="last_name"
                    value={newUser.last_name}
                    onChange={handleChange}
                    placeholder="Фамилия"
                    required
                />
                <input
                    type="text"
                    name="job_number"
                    value={newUser.job_number}
                    onChange={handleChange}
                    placeholder="Табельный номер"
                    required
                />
                <input
                    type="email"
                    name="login"
                    value={newUser.login}
                    onChange={handleChange}
                    placeholder="Эл. почта"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleChange}
                    placeholder="Пароль"
                    required
                />
                <select
                    name="roleID"
                    value={newUser.roleID}
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
                            checked={newUser.permissions_id.includes(1)}
                            onChange={handlePermissionChange}
                        />
                        Добавление заблокированных пользователей
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="2"
                            checked={newUser.permissions_id.includes(2)}
                            onChange={handlePermissionChange}
                        />
                        Удаление заблокированных пользователей
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="3"
                            checked={newUser.permissions_id.includes(3)}
                            onChange={handlePermissionChange}
                        />
                        Обновление заблокированных пользователей
                    </label>
                </div>
                <button type="submit">Добавить</button>
                <button type="button" onClick={onClose}>Закрыть</button>
            </form>
        </div>
    );
}

export default AddNewUser;
