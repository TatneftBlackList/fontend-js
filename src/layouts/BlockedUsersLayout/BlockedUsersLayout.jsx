import {useEffect, useState} from "react";

function BlockedUsersLayout() {
    const [blockedUsers, setBlockedUsers] = useState();
    useEffect(() => {
        const fetchBlockedUsers = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ADDRESS}/users`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Error fetching restaurants");
            }

            const data = await response.json();
            setBlockedUsers(data);
        };

        fetchBlockedUsers();
    }, []);

    return(
        <div>
            {blockedUsers}
        </div>
    )
}

export default BlockedUsersLayout;