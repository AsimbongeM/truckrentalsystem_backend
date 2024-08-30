import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {authenticateUser} from "../services/AuthenticationService.js";
import {signIn as customerSignIn} from "../services/CustomerProfileService.js";
import {AuthContext} from "./AuthContext.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

const SignInComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false); // State to control password visibility
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            // Attempt to authenticate as an employee first
            const employeeResponse = await authenticateUser(email, password);

            if (employeeResponse.status === 200 && employeeResponse.data) {
                const {role} = employeeResponse.data;
                setAuth(employeeResponse.data); // Update auth context

                if (role === "MANAGER") {
                    navigate("/manager-portal");
                } else if (role === "HELP_DESK") {
                    navigate("/help-desk-portal");
                } else {
                    setError('Unknown employee role');
                }
                return; // Exit if authentication as employee is successful
            }
        } catch (error) {
            console.error("Employee authentication error:", error);
        }


        try {
            const customerResponse = await customerSignIn(email, password);

            if (customerResponse.status === 200 && customerResponse.data) {
                setAuth(customerResponse.data);
                navigate("/customer-home");
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            console.error("Customer authentication error:", error);
            setError('Invalid email or password');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-sm border-light rounded-lg" style={{backgroundColor: '#f8f9fa'}}>
                        <div className="card-body">
                            <h2 className="text-center mb-4">Sign In</h2>
                            <form onSubmit={handleSignIn}>
                                <div className="form-group mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div className="form-group mb-4 position-relative">
                                    <label className="form-label">Password</label>
                                    <div style={{position: 'relative'}}>
                                        <input
                                            type={passwordVisible ? 'text' : 'password'}
                                            name="password"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            required
                                            style={{paddingRight: '40px'}} // Add padding to accommodate the icon
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setPasswordVisible(!passwordVisible)}
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                right: '10px',
                                                transform: 'translateY(-50%)',
                                                border: 'none',
                                                background: 'transparent',
                                                cursor: 'pointer',
                                                padding: '0',
                                                fontSize: '16px', // Adjust font size if needed
                                                color: '#6c757d' // Optional: Adjust icon color
                                            }}
                                        >
                                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye}/>
                                        </button>
                                    </div>
                                </div>
                                <div className="text-center mb-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        style={{width: 'auto'}}
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </form>
                            {error && <p className="text-danger text-center mt-3">{error}</p>}
                            <div className="text-center mt-4">
                                <span className="text-muted">
                                    Don't have an account?
                                    <button
                                        className="btn btn-link text-primary fw-bold"
                                        onClick={() => navigate("/sign-up")}
                                    >
                                        Sign Up
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInComponent;
