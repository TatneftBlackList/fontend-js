import { useEffect, useState } from "react";
import './DeleteUser.css';
import RefreshToken from "../../context/RefreshToken";

function DeleteUser() {
    const [isOpen, setIsOpen] = useState(false);
    const [records, setRecords] = useState([]);
    const [selectedRecordId, setSelectedRecordId] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const token = localStorage.getItem("token");

    const handleOpenPopup = () => {
        setIsOpen(true);
    };

    const handleClosePopup = () => {
        setIsOpen(false);
    };

    const handleGetRecords = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ADDRESS}/users`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`
                },
            });
            const data = await response.json();
            if (response.status === 401){
                await RefreshToken();
            }
            setRecords(Array.isArray(data) ? data : []); // Убедитесь, что данные являются массивом
        } catch (error) {
            console.error('Ошибка при получении записей:', error);
        }
    };

    const handleRecordClick = async (id) => {
        setSelectedRecordId(id);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ADDRESS}/users/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`
                },
            });
            if (response.status === 401){
                await RefreshToken();
            }
            if (response.ok) {
                setRecords(records.filter(user => user.id !== id)); // Обновляем список пользователей после удаления
                setIsPopupVisible(true);
            } else {
                const data = await response.json();
                alert("Ошибка: " + data.detail);
            }
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
        } finally {
            setIsOpen(false);
        }
    };

    const handleCloseSuccessPopup = () => {
        setIsPopupVisible(false);
    };

    useEffect(() => {
        if (isOpen) {
            handleGetRecords();
        }
    }, [isOpen]);

    return (
        <div className="delete-user-container">
            <h2>Удаление пользователя</h2>
            <button className="open-popup-button" onClick={handleOpenPopup}>Открыть окно</button>

            {isOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={handleClosePopup}>&times;</span>
                        <h2>Список записей</h2>
                        <ul>
                            {records.map(user => (
                                <li key={user.id} onClick={() => handleRecordClick(user.id)}>
                                    <span>Имя: {user.first_name} </span>
                                    <span>Табельный номер: {user.job_number} </span>
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
                        <span className="close" onClick={handleCloseSuccessPopup}>&times;</span>
                        <p>Пользователь успешно удален!</p>
                        <button onClick={handleCloseSuccessPopup}>ОК</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeleteUser;
