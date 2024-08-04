import {useEffect, useState} from "react";


function UpdateUser() {
    const [isOpen, setIsOpen] = useState(false); // Состояние для управления видимостью окна
    const [records, setRecords] = useState([]); // Состояние для хранения записей
    const [selectedRecordId, setSelectedRecordId] = useState(null); // Состояние для выбранной записи
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
                    "Authorization": token
                },
            });
            const data = await response.json();
            setRecords(data);
        } catch (error) {
            console.error('Ошибка при получении записей:', error);
        }
    };

    const handleRecordClick = async (id) => {
        setIsOpen(false)
        setSelectedRecordId(id);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ADDRESS}/users/${id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
            });
            const data = await response.json();
            alert("Удален пользователь: " + selectedRecordId)
        } catch (error) {
            console.error('Ошибка при получении записей:', error);
        }
    };

    useEffect(() => {
        if (isOpen) {
            handleGetRecords().then(r => console.log(r));
        }
    }, [isOpen]); // Выполняем запрос только при открытии окна

    return (
        <div>
            <h2>Update user</h2>
            <button onClick={handleOpenPopup}>Открыть окно</button>

            {isOpen && ( // Отображаем окно только если isOpen = true
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={handleClosePopup}>&times;</span>
                        <h2>Список записей</h2>
                        <ul>
                            {records.map(user => (
                                <li key={user.id} onClick={() => handleRecordClick(user.id)}>
                                    <span>Имя: {user.first_name} </span>
                                    <span>Номер работы: {user.job_number} </span>
                                    <span>ID: {user.id} </span>
                                </li>
                            ))}
                        </ul>
                        {selectedRecordId && ( // Отображаем информацию о выбранной записи
                            <p>Выбранная запись: {selectedRecordId}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UpdateUser;
