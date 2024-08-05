import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import AddNewUser from "../../components/AddNewUser/AddNewUser";
import DeleteUser from "../../components/DeleteUser/DeleteUser";
import UpdateUser from "../../components/UpdateUser/UpdateUser";
import './AdminPage.css';


function AdminPage() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role")

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, []);

    return (

        <div className='box'>
            <div className="admin-container">
                <h1>Admin Page</h1>
                {role === "ADMIN" ?
                    <div className="admin-actions">
                    <AddNewUser/>
                    <DeleteUser/>
                    <UpdateUser/>
                </div> : <h2>Страница доступна только Админам</h2>}
            </div>
        </div>
    );
}

export default AdminPage;
