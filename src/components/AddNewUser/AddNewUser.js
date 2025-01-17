import React, { useState } from "react";
import './AddNewUser.css';

function AddNewUser() {
    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        job_number: '',
        login: '',
        password: '',
        roleID: '',
        permissions_id: []
    });
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handleAdd = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ADDRESS}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        });
        const data = await response.json();
        if (!response.ok) {
            alert("Ошибка: " + data.detail);
        } else {
            setIsPopupVisible(true);
            setNewUser({
                first_name: '',
                last_name: '',
                job_number: '',
                login: '',
                password: '',
                roleID: '',
                permissions_id: []
            });
        }
        console.log(data);
        console.log('Adding user:', newUser);
    };

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

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    return (
        <div className="add-user-container">
            <h2>Добавление пользователя</h2>
            <form className="add-user-form" onSubmit={(e) => {
                e.preventDefault();
                handleAdd();
            }}>
                <input
                    type="text"
                    name="first_name"
                    value={newUser.first_name}
                    onChange={handleChange}
                    placeholder="Введите имя"
                    required
                />
                <input
                    type="text"
                    name="last_name"
                    value={newUser.last_name}
                    onChange={handleChange}
                    placeholder="Введите фамилию"
                    required
                />
                <input
                    type="text"
                    name="job_number"
                    value={newUser.job_number}
                    onChange={handleChange}
                    placeholder="Введите табельный номер"
                    required
                />
                <input
                    type="email"
                    name="login"
                    value={newUser.login}
                    onChange={handleChange}
                    placeholder="Введите эл почту"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleChange}
                    placeholder="Введите пароль"
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
            </form>

            {isPopupVisible && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={handleClosePopup}>&times;</span>
                        <p>Пользователь успешно добавлен!</p>
                        <button onClick={handleClosePopup}>ОК</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddNewUser;
