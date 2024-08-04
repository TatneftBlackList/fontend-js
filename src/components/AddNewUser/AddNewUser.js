import React, {useState} from "react";

function AddNewUser() {
    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        job_number: '',
        login: '',
        password: '',
        roleID: '',
        permissions_id: []
    });

    const handleAdd = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ADDRESS}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        });
        const data = await response.json()
        if (!response.ok) {
            alert("Ошибка: " + data.detail)
        }
        console.log(data)
        console.log('Adding user:', newUser);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewUser({...newUser, [name]: value});
    };

    const handlePermissionChange = (e) => {
        const {value, checked} = e.target;
        const selectedPermissions = newUser.permissions_id;
        if (checked) {
            setNewUser({...newUser, permissions_id: [...selectedPermissions, Number(value)]});
        } else {
            setNewUser({...newUser, permissions_id: selectedPermissions.filter((perm) => perm !== Number(value))});
        }
    };

    return (
        <>
            <h2>Add User</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleAdd();
            }}>
                <input
                    type="text"
                    name="first_name"
                    value={newUser.first_name}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    required
                />
                <input
                    type="text"
                    name="last_name"
                    value={newUser.last_name}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    required
                />
                <input
                    type="text"
                    name="job_number"
                    value={newUser.job_number}
                    onChange={handleChange}
                    placeholder="Enter job number"
                    required
                />
                <input
                    type="email"
                    name="login"
                    value={newUser.login}
                    onChange={handleChange}
                    placeholder="Enter login email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                />
                <select
                    name="roleID"
                    value={newUser.roleID}
                    onChange={handleChange}
                    required
                >
                    <option value="">Выберите роль</option>
                    <option value="1">Администратор</option>
                    <option value="2">Пользователь</option>
                </select>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            value="1"
                            checked={newUser.permissions_id.includes(1)}
                            onChange={handlePermissionChange}
                        />
                        Добавление заблокированных пользователей
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="2"
                            checked={newUser.permissions_id.includes(2)}
                            onChange={handlePermissionChange}
                        />
                        Удаление заблокированных пользователей
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="3"
                            checked={newUser.permissions_id.includes(3)}
                            onChange={handlePermissionChange}
                        />
                        Обновление заблокированных пользователей
                    </label>
                </div>
                <button type="submit">Confirm</button>
            </form>
        </>
    )
}

export default AddNewUser;