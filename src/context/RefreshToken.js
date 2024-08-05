import {useContext} from "react";
import {AuthContext} from "./AuthProvider";

async function RefreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    const { login } = useContext(AuthContext);
    const { saveRefreshTokenToLocalStorage } = useContext(AuthContext);
    const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ADDRESS}/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(refreshToken)
    });
    const data = await response.json();
    if (!response.ok) {
        alert("Ошибка: " + data.detail);
    } else {
        login(data.access_token)
        saveRefreshTokenToLocalStorage(data.refresh_token)
    }
}
export default RefreshToken;