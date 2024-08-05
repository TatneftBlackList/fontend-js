import React, { useEffect, useState, useCallback } from 'react';
import './BlockedUsersLayout.css'; // Импортируем стили

function BlockedUsersLayout() {
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const token = localStorage.getItem("token");

    const fetchBlockedUsers = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ADDRESS}/blockedUnits`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`
                },
            });

            if (!response.ok) {
                throw new Error("Ошибка при получении списка заблокированных пользователей");
            }

            const data = await response.json();
            console.log("Fetched blocked users:", data); // Добавляем отладочный лог
            setBlockedUsers(data);
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
    }, [token]);

    useEffect(() => {
        fetchBlockedUsers();
    }, [fetchBlockedUsers]);

    const handleUserClick = (userId) => {
        setSelectedUserId(prevUserId => prevUserId === userId ? null : userId);
    };

    return (
        <div className="container">
            <h1>Список заблокированных пользователей</h1>
            {blockedUsers.length > 0 ? (
                <ul className="user-list">
                    {blockedUsers.map(user => (
                        <li key={user.id} className="user-list-item" onClick={() => handleUserClick(user.id)}>
                            <span>{user.fio}</span>
                            <div className={`user-details ${selectedUserId === user.id ? 'show' : ''}`}>
                                <p><strong>Компания:</strong> {user.company.name}</p>
                                <p><strong>Причина:</strong> {user.reason}</p>
                                <p><strong>Дата добавления:</strong> {new Date(user.date_add_to_list).toLocaleString()}</p>
                                <h4>Паспортные данные:</h4>
                                <p><strong>Серия паспорта:</strong> {user.passports.passport_seria}</p>
                                <p><strong>Номер паспорта:</strong> {user.passports.passport_number}</p>
                                <p><strong>Старая серия паспорта:</strong> {user.passports.old_passport_seria}</p>
                                <p><strong>Старый номер паспорта:</strong> {user.passports.old_passport_number}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Заблокированных пользователей нет</p>
            )}
        </div>
    );
}

export default BlockedUsersLayout;
