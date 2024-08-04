import BlockedUsersLayout from "../../layouts/BlockedUsersLayout/BlockedUsersLayout";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";


function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
        }
    }, [navigate])

    return (
        <>
            <BlockedUsersLayout/>
        </>
    )
}

export default HomePage;