import {useEffect, useState} from "react";

function BlockedUsersLayout() {
    const [blockedUsers, setBlockedUsers] = useState([]);
    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchBlockedUsers = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ADDRESS}/users`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
            });

            if (!response.ok) {
                // throw new Error("Error fetching restaurants");
            }

            const data = await response.json();
            console.log(data)
            setBlockedUsers(data);
        };

        fetchBlockedUsers();
    }, []);

    console.log(blockedUsers)
    return (
        <div>
            <h1>Список пользователей</h1>
            {blockedUsers != null ?
            <ul>
                {blockedUsers.map(user => (
                    <li key={user.id}>
                        {user.first_name} {user.last_name} (Номер работы: {user.job_number})
                    </li>
                ))}
            </ul>: "Заблокированных пользователей нет"}
        </div>
    )
}

export default BlockedUsersLayout;