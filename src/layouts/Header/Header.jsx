import "./Header.css";
import Button from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";

function Header() {

    let navigate = useNavigate();
    const role = localStorage.getItem("role")
    const handleHomeButtonClick = () => {
        navigate("/")
    }

    const handleAdminButtonClick = () =>{
        navigate("/admin")
    }
    return (
        <div className="header">
            <Button onClick={handleHomeButtonClick}>Домой</Button>
            <Button className="button accept">Выйти</Button>
            {role === "ADMIN" ? <Button className="button accept" onClick={handleAdminButtonClick}>Админ</Button> : <div/>}
        </div>
    )
}

export default Header;