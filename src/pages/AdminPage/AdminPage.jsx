import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddNewUser from "../../components/AddNewUser/AddNewUser";
import DeleteUser from "../../components/DeleteUser/DeleteUser";
import UpdateUser from "../../components/UpdateUser/UpdateUser";
import './AdminPage.css';
import Header from "../../layouts/Header/Header";

function AdminPage() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div className="admin-container">
            <h1>Admin Page</h1>
            <div className="admin-actions">
                <AddNewUser />
                <DeleteUser />
                <UpdateUser />
            </div>
        </div>
    );
}

export default AdminPage;
