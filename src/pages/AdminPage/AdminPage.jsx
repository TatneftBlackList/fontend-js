import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import AddNewUser from "../../components/AddNewUser/AddNewUser";
import DeleteUser from "../../components/DeleteUser/DeleteUser";
import UpdateUser from "../../components/UpdateUser/UpdateUser";

function AdminPage() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [navigate]);


    return (
        <div>
            <h1>Admin Page</h1>
            <AddNewUser/>
            <DeleteUser/>
            <UpdateUser/>
        </div>
    );
}

export default AdminPage;
