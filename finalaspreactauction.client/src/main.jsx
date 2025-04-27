import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Account from './Account/Account';
import AddCar1 from './Components/Fetch/AddCar1';
import AdminSide from './Components/Admin/AdminSide';
import CarList from './Components/Fetch/CarList';
import AdminLayout from './Components/Page/AdminLayout';
import NotFound from './Components/Page/NotFound';
import GetCarByMake from './Components/Fetch/GetCarByMake';
import UpdateMakeForm from './Components/Admin/UpdateMake';
import UpdateModelForm from './Components/Admin/UpdateModel';
import ResponsiveAutoExample from './Components/Example/ResponsiveAutoExample';
import ExitAnimation from './Components/Example/Animation';
import GetCarById from './Components/Fetch/GetCarById';
import { Link } from 'react-router-dom';
import ForAdmin from './Components/Example/ForAdmin';
import ChatBotWithAI from './Components/Example/ChatGPTComponent';
import Header from './Components/Page/Header';
import Footer from './Components/Example/Example11';
import { jwtDecode } from "jwt-decode";
import { Navigate } from 'react-router-dom';
import AboutPage from './Components/Page/AboutPage';



// Button styles for the link
const button = {
    backgroundColor: "#0cdcf7",
    borderRadius: "10px",
    padding: "10px 20px",
    color: "#0f1115",
    cursor: "pointer",
    fontSize: "16px",
    height: "min-content",
    textDecoration: "none",
    margin: "10px"
};


function AppRoutes() {
    const [userRole, setUserRole] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                setUserRole(role);
                console.log(role)
            } catch (e) {
                console.error("Error decoding token", e);
                setUserRole(null);
            }
        }
    }, []);
    const location = useLocation();
    if (userRole === null) {
        return <div>Loading...</div>;
    }
    const isAdmin = userRole ==='Admin';
    const showFooter = location.pathname !== "/login" && location.pathname !== "/404" && location.pathname !== "*";

    return (
        <>
            <Routes>
                <Route path="/login" element={<Account />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/" element={<App />} />
                <Route path="/car/:id" element={
                    <Header>
                        <GetCarById />
                    </Header>
                } />
                <Route path="/admin" element={isAdmin ? < AdminLayout /> : (<Navigate to="/" />)}>
                    <Route index element={<ForAdmin />} />
                    <Route path="addNew" element={<ExitAnimation />} />
                    <Route path="delete" element={<CarList />} />
                    <Route path="addmakeormodel" element={<AdminSide />} />
                    <Route path="AI" element={<ChatBotWithAI />} />
                    <Route path="UpdateMakeForm" element={<UpdateMakeForm />} />
                    <Route path="UpdateModel" element={<UpdateModelForm />} />
                    <Route path="adminside" element={<div className="m-2 flex flex-row px-3 gap-2">
                        {<AdminSide />}
                        {<ExitAnimation />}
                        <Link to="/admin/delete" style={button}>Delete</Link>
                    </div>} />
                </Route>
                <Route path={`/getCarByBrand/:id`} element={
                    <Header>
                        <GetCarByMake />
                    </Header>
                } />
                <Route path="*" element={<NotFound />} />
            </Routes>
            {showFooter && <Footer />}
        </>
    );
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    </StrictMode>
);
