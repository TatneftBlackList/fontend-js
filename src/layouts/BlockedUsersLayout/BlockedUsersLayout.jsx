import React, {useEffect, useState, useCallback} from 'react';
import AddNewBlockedUnit from '../../components/AddNewBlockeUnit/AddNewBlockedUnit';
import UpdateBlockedUnit from '../../components/UpdateBlockedUnit/UpdateBlockedUnit';
import DeleteBlockedUnit from '../../components/DeleteBlockedUnit/DeleteBlockedUnit';
import Popup from '../../components/popup/Popup';
import './BlockedUsersLayout.css';
import RefreshToken from "../../context/RefreshToken";

function BlockedUsersLayout() {
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [companies, setCompanies] = useState([]);
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
                const errorData = await response.json();
                console.log(errorData);
                throw new Error("Ошибка при получении списка заблокированных пользователей");
            }

            const data = await response.json();
            setBlockedUsers(data);
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
    }, [token]);

    const fetchCompanies = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ADDRESS}/company`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
            });

            if (response.status === 401) {
                await RefreshToken();
            } else if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData);
                throw new Error("Ошибка при получении списка компаний");
            }

            const data = await response.json();
            setCompanies(data);
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
    }, [token]);

    useEffect(() => {
        fetchBlockedUsers();
        fetchCompanies();
    }, [fetchBlockedUsers, fetchCompanies]);

    const handleUserClick = (user) => {
        setSelectedUser(selectedUser?.id === user.id ? null : user);
    };

    const handleAddUser = (newUser) => {
        setBlockedUsers([...blockedUsers, newUser]);
        setIsAddPopupOpen(false);
    };

    const handleUpdateUser = (updatedUser) => {
        setBlockedUsers(blockedUsers.map(user => user.id === updatedUser.id ? updatedUser : user));
        setSelectedUser(updatedUser);
        setIsUpdatePopupOpen(false);
    };

    const handleDeleteUser = (userId) => {
        setBlockedUsers(blockedUsers.filter(user => user.id !== userId));
        setSelectedUser(null);
    };

    const showSuccessPopup = (message) => {
        setSuccessMessage(message);
        setIsSuccessPopupOpen(true);
    };

    return (
        <div className="container">
            <h1>Список заблокированных пользователей</h1>
            <button className="open-popup-button" onClick={() => setIsAddPopupOpen(true)}>Добавить пользователя</button>
            <Popup isOpen={isAddPopupOpen} onClose={() => setIsAddPopupOpen(false)}>
                <AddNewBlockedUnit onAdd={handleAddUser} companies={companies} showSuccessPopup={showSuccessPopup}/>
            </Popup>
            <Popup isOpen={isSuccessPopupOpen} onClose={() => setIsSuccessPopupOpen(false)} autoCloseDuration={3000}>
                <p>{successMessage}</p>
            </Popup>
            {blockedUsers.length > 0 ? (
                <ul className="user-list">
                    {blockedUsers.map(user => (
                        <li key={user.id} className="user-list-item" onClick={() => handleUserClick(user)}>
                            <div className="user-list-item-header">
                                {user.fio}
                            </div>
                            {selectedUser?.id === user.id && (
                                <div className="user-details">
                                    <h3>{selectedUser.fio}</h3>
                                    <p><strong>Компания:</strong> {selectedUser.company.name}</p>
                                    <p><strong>Причина:</strong> {selectedUser.reason}</p>
                                    <p><strong>Дата
                                        добавления:</strong> {new Date(selectedUser.date_add_to_list).toLocaleString()}
                                    </p>
                                    <h4>Паспортные данные:</h4>
                                    <p><strong>Серия паспорта:</strong> {selectedUser.passports.passport_seria}</p>
                                    <p><strong>Номер паспорта:</strong> {selectedUser.passports.passport_number}</p>
                                    <p><strong>Старая серия
                                        паспорта:</strong> {selectedUser.passports.old_passport_seria}</p>
                                    <p><strong>Старый номер
                                        паспорта:</strong> {selectedUser.passports.old_passport_number}</p>
                                    <DeleteBlockedUnit userId={selectedUser.id} onDelete={handleDeleteUser}
                                                       showSuccessPopup={showSuccessPopup}/>
                                    {/*<button className="edit__user" onClick={() => setIsUpdatePopupOpen(true)}>Редактировать</button>*/}
                                    {/*<Popup isOpen={isUpdatePopupOpen} onClose={() => setIsUpdatePopupOpen(false)}>*/}
                                    {/*    <UpdateBlockedUnit user={selectedUser} onUpdate={handleUpdateUser} companies={companies} showSuccessPopup={showSuccessPopup} />*/}
                                    {/*</Popup>*/}
                                </div>
                            )}
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
