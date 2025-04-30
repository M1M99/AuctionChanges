import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function AdminProfile() {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserInfo(decoded);
            } catch (error) {
                console.error("JWT Decode Error:", error);
                console.error("JWT Decode Error:", error);
            }
        }
    }, []);

    if (!userInfo) {
        return <div>Loading user info...</div>;
    }

    return (
        <div>
            <h2>User Info</h2>
            <pre>{JSON.stringify(userInfo, null, 2)}</pre>
        </div>
    );
}

export default AdminProfile;
