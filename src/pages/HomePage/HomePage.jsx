import BlockedUsersLayout from "../../layouts/BlockedUsersLayout/BlockedUsersLayout";
import {useNavigate} from "react-router";
import {useEffect} from "react";

function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [navigate])

    return (
        <>
            <BlockedUsersLayout/>
        </>
    )
}

export default HomePage;