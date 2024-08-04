import "./Header.css";
import Button from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";

function Header() {

    let navigate = useNavigate();

    const handleHomeButtonClick = () =>{
        navigate("/")
    }

    return (
        <div className="header">
            <Button onClick={handleHomeButtonClick}>Домой</Button>
            <Button className="button accept">Выйти</Button>
        </div>
    )
}

export default Header;