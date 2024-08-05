import "./Header.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

function Header() {

    let navigate = useNavigate();

    const handleHomeButtonClick = () => {
        navigate("/");
    }

    const handleLogoutButtonClick = () => {
        // Логика выхода
        navigate("/login");
    }

    return (
        <div className="header">
            <Button className="button" onClick={handleHomeButtonClick}>Домой</Button>
            <Button className="button accept" onClick={handleLogoutButtonClick}>Выйти</Button>
        </div>
    );
}

export default Header;
