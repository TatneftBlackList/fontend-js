import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import "./SignUpPage.css"

function Register () {
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthdayDate, setBirthdayDate] = useState(new Date());
    const [phoneNumber, setPhoneNumber] = useState('');

    let navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();

        const isValidFirstName = validator.isLength(firstName, { min: 2, max: 30 });
        const isValidLastName = validator.isLength(lastName, { min: 2, max: 30 });
        const isValidEmail = validator.isEmail(email);
        const isValidPassword = validator.isLength(password, { min: 6, max: 30 });
        const isValidPhoneNumber = validator.isMobilePhone(phoneNumber, 'ru-RU');
        const isValidBirthdayDate = validator.isDate(birthdayDate, { format: 'YYYY-MM-DD' });

        if (!isValidFirstName || !isValidLastName || !isValidEmail || !isValidPassword || !isValidPhoneNumber || !isValidBirthdayDate) {
            console.error('Invalid data');
            return;
        }

        try {
            const response = await fetch('http://45.141.102.127:8080/api/v1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                    birthdayDate,
                    phoneNumber
                }),
            });

            if (!response.ok) {
                console.error('Registration failed:');
            } else {
                console.log('Registration successful:', response.data);
                navigate('/login');

            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="main-container">
            <form onSubmit={handleRegister}>
                <h2>Регистрация</h2>
                <div className="input-container">
                    <input type="text" placeholder="Имя" value={firstName} onChange={(e) => setFirstname(e.target.value)}/>
                    <input type="text" placeholder="Фамилия" value={lastName} onChange={(e) => setLastname(e.target.value)}/>
                    <input type="text" placeholder="Телефон номер" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                    <input type="text" placeholder="Дата рождения" value={birthdayDate} onChange={(e) => setBirthdayDate(e.target.value)}/>
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="button-container">
                    <button type="submit">Регистрация</button>
                </div>
            </form>
        </div>
    );
}

export default Register;