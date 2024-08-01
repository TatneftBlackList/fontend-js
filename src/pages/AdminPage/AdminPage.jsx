import {useNavigate} from "react-router";
import {useEffect} from "react";

function AdminPage() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [navigate])
    return (
        <>
        </>
    )
}

export default AdminPage;