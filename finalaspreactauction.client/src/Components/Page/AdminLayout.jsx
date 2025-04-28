import Container from 'react-bootstrap/Container';
import { Outlet, Link,useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';  

function AdminLayout() {
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const userName = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ; // JWT yapýsýna göre uygun olan key'i seçin
                setUsername(userName);
                console.log(decoded)
            } catch (error) {
                console.error("JWT Decode Error:", error);
            }
        }
    }, []);

    return (
        <div>
            <Navbar expand="lg" style={{ backgroundColor: "#536878" }}>
                <Container>
                    <Navbar.Brand as={Link} to="/admin" id="meauto">Admin-Auction</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/login">Account</Nav.Link>
                            <Nav.Link as={Link} to="/admin/adminside">Edit Page</Nav.Link>
                            <NavDropdown title="Edit" id="basic-nav-dropdown" className="custom-dropdown">
                                <NavDropdown.Item as={Link} to="/admin/addmakeormodel">Add New Make</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/admin/delete">Delete/Update</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/admin/addNew">Add New Vehicle</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/admin/UpdateMakeForm">Update Make</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/admin/UpdateModel">Update Model</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/admin/AI">Ask To AI</NavDropdown.Item>
                                <NavDropdown.Divider />
                            </NavDropdown>
                        </Nav>
                        <Nav id="perfect" className="ms-auto rounded px-2" style={{ border:"2px solid #bde0fe", fontWeight: "600", display: "flex", alignItems: "center" }}>
                            <img
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    marginRight: "0",
                                    cursor: 'pointer'
                                }}
                                onClick={() => navigate("/login")}
                                src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
                                alt="Profile"
                            />
                            {username ? (
                                <Nav.Link onClick={() => navigate("/login") }>{username}</Nav.Link>
                            ) : (
                                <Nav.Link>Loading...</Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="p-4">
                <Outlet />
            </div>
        </div>
    );
}

export default AdminLayout;
