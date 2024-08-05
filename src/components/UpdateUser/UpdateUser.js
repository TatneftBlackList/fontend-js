import { useEffect, useState } from "react";
import './UpdateUser.css';
import RefreshToken from "../../context/RefreshToken";

function UpdateUser() {
    const [isOpen, setIsOpen] = useState(false);
    const [records, setRecords] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const token = localStorage.getItem("token");

    const handleOpenPopup = () => {
        setIsOpen(true);
    };

    const handleClosePopup = () => {
        setIsOpen(false);
    };

    const handleCloseUpdatePopup = () => {
        setIsPopupVisible(false);
    };

    const handleGetRecords = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ADDRESS}/users`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
            });
            if (response.status === 401){
                await RefreshToken();
            }
            const data = await response.json();
            setRecords(Array.isArray(data) ? data : []); // Убедитесь, что данные являются массивом
        } catch (error) {
            console.error('Ошибка при получении записей:', error);
        }
    };

    const handleRecordClick = (user) => {
        setSelectedUser(user);
        setIsPopupVisible(true);
        setIsOpen(false);
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ADDRESS}/users/${selectedUser.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(selectedUser)
            });
            if (response.ok) {
                alert("Пользователь успешно обновлен!");
                setIsPopupVisible(false);
            } else {
                const data = await response.json();
                alert("Ошибка: " + data.detail);
            }
        } catch (error) {
            console.error('Ошибка при обновлении пользователя:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser({ ...selectedUser, [name]: value });
    };

    useEffect(() => {
        if (isOpen) {
            handleGetRecords();
        }
    }, [isOpen]);

    return (
        <div className="update-user-container">
            <h2>Обновление пользователя</h2>
            <button className="open-popup-button" onClick={handleOpenPopup}>Открыть окно</button>

            {isOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={handleClosePopup}>&times;</span>
                        <h2>Список записей</h2>
                        <ul>
                            {records.map(user => (
                                <li key={user.id} onClick={() => handleRecordClick(user)}>
                                    <span>Имя: {user.first_name} </span>
                                    <span>Номер работы: {user.job_number} </span>
                                    <span>ID: {user.id} </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {isPopupVisible && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={handleCloseUpdatePopup}>&times;</span>
                        <h2>Обновить пользователя</h2>
                        <form onSubmit={handleUpdateUser}>
                            <input
                                type="text"
                                name="first_name"
                                value={selectedUser.first_name}
                                onChange={handleChange}
                                placeholder="Имя"
                                required
                            />
                            <input
                                type="text"
                                name="last_name"
                                value={selectedUser.last_name}
                                onChange={handleChange}
                                placeholder="Фамилия"
                                required
                            />
                            <input
                                type="text"
                                name="job_number"
                                value={selectedUser.job_number}
                                onChange={handleChange}
                                placeholder="Табельный номер"
                                required
                            />
                            <input
                                type="email"
                                name="login"
                                value={selectedUser.login}
                                onChange={handleChange}
                                placeholder="Эл. почта"
                                required
                            />
                            <button type="submit">Обновить</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UpdateUser;
