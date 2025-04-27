import { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import Header from "../Page/Header";
import Fade from "react-bootstrap/esm/Fade";
import AddModel from "./AddModel";
import styled from "styled-components";
import { Alert } from '@mui/material';

const StyledWrapper = styled.div`
                    .form-container {
                        margin-left:auto;
                        margin-right:auto;
                        width: 320px;
                    border-radius: 0.75rem;
                    background-color: rgba(17, 24, 39, 1);
                    padding: 2rem;
                    color: rgba(243, 244, 246, 1);
  }

                    .title {
                        text - align: center;
                    font-size: 1.5rem;
                    line-height: 2rem;
                    font-weight: 700;
  }

                    .form {
                        margin - top: 1.5rem;
  }

                    .input-group {
                        margin - top: 0.25rem;
                    font-size: 0.875rem;
                    line-height: 1.25rem;
  }

                    .input-group label {
                        display: block;
                    color: rgba(156, 163, 175, 1);
                    margin-bottom: 4px;
  }

                    .input-group input {
                        width: 100%;
                    border-radius: 0.375rem;
                    border: 1px solid rgba(55, 65, 81, 1);
                    outline: 0;
                    background-color: rgba(17, 24, 39, 1);
                    padding: 0.75rem 1rem;
                    color: rgba(243, 244, 246, 1);
  }

                    .input-group input:focus {
                        border - color: rgba(167, 139, 250);
  }

                    .forgot {
                        display: flex;
                    justify-content: flex-end;
                    font-size: 0.75rem;
                    line-height: 1rem;
                    color: rgba(156, 163, 175,1);
                    margin: 8px 0 14px 0;
  }

                    .forgot a,.signup a {
                        color: rgba(243, 244, 246, 1);
                    text-decoration: none;
                    font-size: 14px;
  }

                    .forgot a:hover, .signup a:hover {
                        text - decoration: underline rgba(167, 139, 250, 1);
  }

                    .sign {
                        display: block;
                    width: 100%;
                    background-color: rgba(167, 139, 250, 1);
                    padding: 0.75rem;
                    text-align: center;
                    color: rgba(17, 24, 39, 1);
                    border: none;
                    border-radius: 0.375rem;
                    font-weight: 600;
  }

                    .social-message {
                        display: flex;
                    align-items: center;
                    padding-top: 1rem;
  }

                    .line {
                        height: 1px;
                    flex: 1 1 0%;
                    background-color: rgba(55, 65, 81, 1);
  }

                    .social-message .message {
                        padding - left: 0.75rem;
                    padding-right: 0.75rem;
                    font-size: 0.875rem;
                    line-height: 1.25rem;
                    color: rgba(156, 163, 175, 1);
  }

                    .social-icons {
                        display: flex;
                    justify-content: center;
  }

                    .social-icons .icon {
                        border - radius: 0.125rem;
                    padding: 0.75rem;
                    border: none;
                    background-color: transparent;
                    margin-left: 8px;
  }

                    .social-icons .icon svg {
                        height: 1.25rem;
                    width: 1.25rem;
                    fill: #fff;
  }

                    .signup {
                        text - align: center;
                    font-size: 0.75rem;
                    line-height: 1rem;
                    color: rgba(156, 163, 175, 1);
  }`;
function AdminSide() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [Adminname, setAdminname] = useState('');
    const [token, setToken] = useState(null);
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();
    const [flag, setFlag] = useState(false);
    const location = useLocation();
    const formRef = useRef(null);
    const [formId, setFormId] = useState("formMake");

    useEffect(() => {
        const checkWidth = () => {
            if (formRef.current) {
                const width = formRef.current.offsetWidth;
                console.log("Form geniþliði:", width);
                setFormId(width > 300 ? "jjfc" : "formMake");
            }
        };
        if (flag) checkWidth();
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener("resize", checkWidth);
    }, [flag]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const makeData = {
            name: name,
            description: description
        };

        try {
            const res = await fetch("https://localhost:7038/api/Brand/AddMake", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(makeData),
            });

            if (res.ok) {
                const data = await res.json();
                setResponse(data);

                setTimeout(() => {
                    setResponse(null);
                    setName('')
                    setDescription('')
                }, 10000)
            } else {
                const data = await res.json();
                setError(data.message);
            }
        } catch (error) {
            setError("Error: Could not connect to the server.");
            console.error("Error: ", error);
        } finally {
            setLoading(false);
        }
    };
    //useEffect(() => {
    //    document.body.style.overflow = 'hidden';
    //    return () => {
    //        document.body.style.overflow = 'auto';
    //    };
    //}, []);
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log(decoded);

                const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                const userName = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

                setUserRole(role);
                console.log(role);

                if (role === 'Admin') {
                    setAdminname(userName);
                    setToken(token);
                } else {
                    setError("You are not admin.");
                    navigate("/#");
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                setError("Invalid token.");
                navigate("/#");
            }
        } else {
            setError("You need to log in first.");
            navigate("/");
        }
    }, [navigate]);
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

    const backgroundColor = location.pathname === "/admin/adminside" ? "" : "#008080"

    return (
        <div style={{ height: "1000px", overflow: "hidden" }}>
            {userRole === "Admin" &&
                (
                <div className="pb-3" style={{ backgroundColor: backgroundColor , height: "1000px", overflow: "hidden" }}>
                        {/*<h2 id="adminSideName">Welcome {Adminname}</h2>*/}
                        {/*<AddModel />*/}
                        <button style={button} onClick={() => setFlag(!flag)}
                            aria-controls="example-fade-text"
                            aria-expanded={flag}>
                            {!flag ? "Add Make" : "Cancel"}
                        </button>


                        <Fade in={flag}>
                            <StyledWrapper>
                            <div ref={formRef} id={formId} className="form-container">
                                    <p className="title">Add New Make</p>
                                    <form className="form" onSubmit={handleSubmit}>
                                        <div className="input-group">
                                            <label htmlFor="username">Make</label>
                                            <input
                                                type="text"
                                                id="username"
                                                value={name}
                                                placeholder="Enter Name"
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="input-group py-3" >
                                            <label htmlFor="description">Description</label>
                                            <input
                                                type="text"
                                                id="description"
                                                placeholder="Enter Description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                        <button type="submit" className="sign" disabled={loading}> {loading ? "Submitting..." : "Submit"}</button>
                                    </form>
                                    <div className="social-message">
                                        <div className="line"/>
                                        <p className="message">New Make</p>
                                        <div className="line" />
                                    </div>
                                </div>
                            </StyledWrapper>
                        </Fade>
                        {response && (
                        <Alert className="my-3" variant="filled" severity="success">
                            {response}
                        </Alert>
                        )}

                        {error && (
                            <div style={{ color: "red", marginTop: "10px" }}>
                                <p>{error}</p>

                            </div>
                        )}
                    </div>)}
        </div>
    );
}

export default AdminSide;
