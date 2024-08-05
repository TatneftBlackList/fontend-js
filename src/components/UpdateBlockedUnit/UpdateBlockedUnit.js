import React, { useState, useEffect } from 'react';
import './UpdateBlockedUnit.css';

function UpdateBlockedUnit({ user, onUpdate, companies, showSuccessPopup }) {
    const [formData, setFormData] = useState({
        fio: '',
        passports: {
            passport_seria: '',
            passport_number: '',
            old_passport_number: '',
            old_passport_seria: ''
        },
        company_id: '',
        reason: ''
    });

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('passports.')) {
            const key = name.split('.')[1];
            setFormData({
                ...formData,
                passports: {
                    ...formData.passports,
                    [key]: value
                }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ADDRESS}/blockedUnits/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                onUpdate(data);
                showSuccessPopup('Пользователь успешно обновлен!');
            } else {
                const errorData = await response.json();
                alert('Ошибка: ' + errorData.detail);
            }
        } catch (error) {
            console.error('Ошибка при обновлении пользователя:', error);
        }
    };

    if (!user) return null;

    return (
        <div className="update-blocked-unit-container">
            <h2>Обновить заблокированного пользователя</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="fio"
                    value={formData.fio}
                    onChange={handleChange}
                    placeholder="ФИО"
                    required
                />
                <input
                    type="text"
                    name="passports.passport_seria"
                    value={formData.passports.passport_seria}
                    onChange={handleChange}
                    placeholder="Серия паспорта"
                    required
                />
                <input
                    type="text"
                    name="passports.passport_number"
                    value={formData.passports.passport_number}
                    onChange={handleChange}
                    placeholder="Номер паспорта"
                    required
                />
                <input
                    type="text"
                    name="passports.old_passport_number"
                    value={formData.passports.old_passport_number}
                    onChange={handleChange}
                    placeholder="Старый номер паспорта"
                    required
                />
                <input
                    type="text"
                    name="passports.old_passport_seria"
                    value={formData.passports.old_passport_seria}
                    onChange={handleChange}
                    placeholder="Старая серия паспорта"
                    required
                />
                <select
                    name="company_id"
                    value={formData.company_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Выберите компанию</option>
                    {companies.map(company => (
                        <option key={company.id} value={company.id}>
                            {company.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Причина"
                    required
                />
                <button type="submit">Обновить</button>
            </form>
        </div>
    );
}

export default UpdateBlockedUnit;
