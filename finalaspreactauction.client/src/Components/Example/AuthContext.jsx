import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserRole(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
                setUserId(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
                setUserName(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
                setIsAuthenticated(true);
            } catch {
                setIsAuthenticated(false);
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('authToken', token);
        const decoded = jwtDecode(token);
        setUserRole(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
        setUserId(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
        setUserName(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        setUserRole(null);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, userId, userName, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
