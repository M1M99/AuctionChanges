import React, { useEffect, useState } from 'react';
import styles from '../Account/account.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import Pattern from '../Components/Example/background';
import { useAuth } from './../Components/Example/AuthContext';
function Account() {
    const [isActive, setIsActive] = useState(false);
    const [css, changeCSS] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [role, setRole] = useState("");
    let navigate = useNavigate();
    const { login } = useAuth();


    useEffect(() => {
        if (!css) {
            document.body.classList.add(styles.bodyBackground);
        } else {
            document.body.classList.remove(styles.bodyBackground);
        }
    }, [css]);

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    const handleHomeClick = () => {
        changeCSS(true)
        navigate("/");
    };
    const handleHomeClick1 = () => {
        changeCSS(true)
        navigate("/admin");
    };

    async function handleSubmitSignIn(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        const response = await axios.post("https://localhost:7038/api/Account/Login/", {
            email: email,
            name: name,
            password: password,
        });
        try {
            if (response.status === 200) {
                console.log("Ok", response.data);
                setRole(response.data.role);
                if (response.data.token) {
                    localStorage.setItem("authToken", response.data.token);
                    login(response.data.token);
                }
                let role1 = response.data.role;
                console.log(role1, "salam")
                console.log(role1.toString())

                if (role1.toString() === "Admin") {
                    console.log("Navigating to admin page");
                    changeCSS(true);
                    return navigate("/admin");
                }
                changeCSS(true)
                navigate("/#");
                console.log(response)
            }
            else if (response.status === 401) {
                console.log(response.status, "error")
                return (response.status)
            }
            else {
                console.log("error");
                setError("Error, please try again");
            }
        }

        catch {
            console.log("error issue")
        }
        finally {
            setLoading(false);
        }
    }

    async function Register(e) {
        e.preventDefault();
        setLoading(true);
        const response = await axios.post("https://localhost:7038/api/Account/Register", {
            email: email,
            password: password,
            name: name,
        })
        try {
            if (response.status === 200) {
                console.log("ok", response.data);
                changeCSS(true)
                navigate("/")
            }
            else {
                console.log("error");
                setError("Error");
            }
        }
        catch {
            console.log("error")
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <>
            <Pattern />
            <div className={`${styles.container} ${isActive ? styles.active : ''}`}>
                {isActive ? (
                    <div className={`${styles['form-container']} ${styles['sign-up']}`}>
                        <form onSubmit={Register}>
                            <h1>Create Account</h1>
                            <div className={styles['social-icons']}>
                                <a href="#" className={styles.icon}><FontAwesomeIcon icon={faGoogle} /></a>
                                <a href="#" className={styles.icon}><FontAwesomeIcon icon={faFacebook} /></a>
                                <a href="#" className={styles.icon}><FontAwesomeIcon icon={faGithub} /></a>
                                <a href="#" className={styles.icon}><FontAwesomeIcon icon={faLinkedin} /></a>
                                <a href="#" className={styles.icon} onClick={handleHomeClick}><FontAwesomeIcon icon={faHouse} /></a>
                            </div>
                            <span>or use your email for registration</span>
                            <input type="text" placeholder="Name" value={name} onChange={(n) => setName(n.target.value)} />
                            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> {/*//change email */}
                            <input type="password" placeholder="Password" value={password} onChange={(p) => setPassword(p.target.value)} />
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>
                ) : (
                    <div className={`${styles['form-container']} ${styles['sign-in']}`}>
                        <form onSubmit={handleSubmitSignIn}>
                            <h1>Sign In</h1>
                            <div className={styles['social-icons']}>
                                <a href="#" className={styles.icon}><FontAwesomeIcon icon={faGoogle} /></a>
                                <a href="#" className={styles.icon}><FontAwesomeIcon icon={faFacebook} /></a>
                                <a href="#" className={styles.icon}><FontAwesomeIcon icon={faGithub} /></a>
                                <a href="#" className={styles.icon}><FontAwesomeIcon icon={faLinkedin} /></a>
                                <a href="#" className={styles.icon} onClick={handleHomeClick}><FontAwesomeIcon icon={faHouse} /></a>
                            </div>
                            <span>or use your email password</span>
                            <input type="text" placeholder="Name" value={name} onChange={(n) => setName(n.target.value)} />
                            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="Password" value={password} onChange={(p) => setPassword(p.target.value)} />
                            <a href="#">Forget Your Password?</a>
                            <button type="submit">Sign In</button>
                        </form>
                    </div>
                )}

                <div className={styles['toggle-container']}>
                    <div className={styles.toggle}>
                        <div className={`${styles['toggle-panel']} ${styles['toggle-left']}`}>
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button onClick={handleLoginClick} className={styles.hidden} id="login">
                                Sign In
                            </button>
                        </div>
                        <div className={`${styles['toggle-panel']} ${styles['toggle-right']}`}>
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button onClick={handleRegisterClick} className={styles.hidden} id="register">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Account;
