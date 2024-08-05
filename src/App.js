import './App.css';
import {Route, Routes} from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import Header from "./layouts/Header/Header";
import Footer from "./layouts/Footer/Footer";
import {AuthProvider} from "./context/AuthProvider";
import SignInPage from "./pages/SignInPage/SignInPage";

function App() {

    return (
        <div className="App">

            <AuthProvider>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/admin" element={<AdminPage/>}/>
                    <Route path="/login" element={<SignInPage/>}/>
                    <Route path="/register" element={<SignInPage/>}/>
                </Routes>
               
            </AuthProvider>
        </div>
    );
}
export default App;
