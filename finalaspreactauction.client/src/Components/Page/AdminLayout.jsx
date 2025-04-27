import Container from 'react-bootstrap/Container';
import { Outlet } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ResponsiveAutoExample from '../Example/ResponsiveAutoExample';
import { Link } from 'react-router-dom';

function AdminLayout() {
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
                                <NavDropdown.Item as={Link} to="/admin/delete">
                                    Delete/Update
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/admin/addNew">Add New Vehicle</NavDropdown.Item>
                                <NavDropdown.Divider />
                                {/*<NavDropdown.Item href="/UpdateMakeForm">*/}
                                {/*    UpdateMake*/}
                                {/*</NavDropdown.Item>*/}
                                <NavDropdown.Item as={Link} to="/admin/UpdateMakeForm">UpdateMake</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/admin/UpdateModel">UpdateModel</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/admin/AI">Ask To AI</NavDropdown.Item>
                                <NavDropdown.Divider />
                            </NavDropdown>
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