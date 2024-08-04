import React, { useEffect, useState, useCallback } from 'react';
import './BlockedUsersLayout.css';

function BlockedUsersLayout() {
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const token = localStorage.getItem("token");

    const fetchBlockedUsers = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ADDRESS}/blockedUnits`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
            });

            if (!response.ok) {
                console.log(response.json())
                throw new Error("Ошибка при получении списка заблокированных пользователей");
            }

            const data = await response.json();
            setBlockedUsers(data);
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
    }, [token]);

    useEffect(() => {
        fetchBlockedUsers();
    }, [fetchBlockedUsers]);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    return (
        <div>
            <h1>Список заблокированных пользователей</h1>
            {blockedUsers.length > 0 ? (
                <ul className="user-list">
                    {blockedUsers.map(user => (
                        <li key={user.id} className="user-list-item" onClick={() => handleUserClick(user)}>
                            {user.fio}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Заблокированных пользователей нет</p>
            )}
            {selectedUser && (
                <div className="user-details">
                    <h3>{selectedUser.fio}</h3>
                    <p><strong>Компания:</strong> {selectedUser.company.name}</p>
                    <p><strong>Причина:</strong> {selectedUser.reason}</p>
                    <p><strong>Дата добавления:</strong> {new Date(selectedUser.date_add_to_list).toLocaleString()}</p>
                    <h4>Паспортные данные:</h4>
                    <p><strong>Серия паспорта:</strong> {selectedUser.passports.passport_seria}</p>
                    <p><strong>Номер паспорта:</strong> {selectedUser.passports.passport_number}</p>
                    <p><strong>Старая серия паспорта:</strong> {selectedUser.passports.old_passport_seria}</p>
                    <p><strong>Старый номер паспорта:</strong> {selectedUser.passports.old_passport_number}</p>
                </div>
            )}
        </div>
    );
}

export default BlockedUsersLayout;
