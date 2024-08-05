import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddNewUser from "../../components/AddNewUser/AddNewUser";
import DeleteUser from "../../components/DeleteUser/DeleteUser";
import UpdateUser from "../../components/UpdateUser/UpdateUser";
import AddCompany from "../../components/AddCompany/AddCompany";
import Popup from "../../components/popup/Popup";
import './AdminPage.css';

function AdminPage() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const [isAddUserPopupOpen, setIsAddUserPopupOpen] = useState(false);
    const [isUpdateUserPopupOpen, setIsUpdateUserPopupOpen] = useState(false);
    const [isDeleteUserPopupOpen, setIsDeleteUserPopupOpen] = useState(false);
    const [isAddCompanyPopupOpen, setIsAddCompanyPopupOpen] = useState(false);
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [navigate]);

    const showSuccessPopup = (message) => {
        setSuccessMessage(message);
        setIsSuccessPopupOpen(true);
    };

    return (
        <div className='box'>
            <div className="admin-container">
                <h1>Admin Page</h1>
                {role === "ADMIN" ?
                    <div className="admin-actions">
                        <button onClick={() => setIsAddUserPopupOpen(true)}>Добавления пользователя</button>
                        <button onClick={() => setIsUpdateUserPopupOpen(true)}>Обновления пользователя</button>
                        <button onClick={() => setIsDeleteUserPopupOpen(true)}>Удаления пользователя</button>
                        <button onClick={() => setIsAddCompanyPopupOpen(true)}>Добавления компании</button>

                        <Popup isOpen={isAddUserPopupOpen} onClose={() => setIsAddUserPopupOpen(false)}>
                            <AddNewUser onClose={() => setIsAddUserPopupOpen(false)} showSuccessPopup={showSuccessPopup} />
                        </Popup>

                        <Popup isOpen={isUpdateUserPopupOpen} onClose={() => setIsUpdateUserPopupOpen(false)}>
                            <UpdateUser onClose={() => setIsUpdateUserPopupOpen(false)} showSuccessPopup={showSuccessPopup} />
                        </Popup>

                        <Popup isOpen={isDeleteUserPopupOpen} onClose={() => setIsDeleteUserPopupOpen(false)}>
                            <DeleteUser onClose={() => setIsDeleteUserPopupOpen(false)} showSuccessPopup={showSuccessPopup} />
                        </Popup>

                        <Popup isOpen={isAddCompanyPopupOpen} onClose={() => setIsAddCompanyPopupOpen(false)}>
                            <AddCompany onClose={() => setIsAddCompanyPopupOpen(false)} showSuccessPopup={showSuccessPopup} />
                        </Popup>
                    </div>
                    : <h2>Страница доступна только Админам</h2>}
            </div>
            <Popup isOpen={isSuccessPopupOpen} onClose={() => setIsSuccessPopupOpen(false)} autoCloseDuration={3000}>
                <p>{successMessage}</p>
            </Popup>
        </div>
    );
}

export default AdminPage;
