import React, { useState } from "react";
import { 
    createUserWithEmailAndPassword, 
    setPersistence,
    browserLocalPersistence,
    // --- New Imports for Google Sign-up ---
    GoogleAuthProvider,
    signInWithPopup 
    // -------------------------------------
} from "firebase/auth";
import { auth } from "../firebase"; 
import { useNavigate, useLocation } from "react-router-dom"; 

// Simple Eye Icon SVG Component (reused)
const EyeIcon = ({ onClick, isVisible, style }) => (
 <svg
 onClick={onClick}
 xmlns="http://www.w3.org/2000/svg"
 viewBox="0 0 24 24"
 fill="currentColor"
 width="20px"
 height="20px"
 style={{ ...style, cursor: "pointer", color: "#888", transition: 'color 0.2s' }}
 >
 {isVisible ? (
 <path d="M12 4.5C7 4.5 2.73 7.61 0 12c2.73 4.39 7 7.5 12 7.5s9.27-3.11 12-7.5c-2.73-4.39-7-7.5-12-7.5zm0 13c-3.15 0-5.75-2.6-5.75-5.75S8.85 6.25 12 6.25s5.75 2.6 5.75 5.75-2.6 5.75-5.75 5.75zm0-9.5c-2.07 0-3.75 1.68-3.75 3.75s1.68 3.75 3.75 3.75 3.75-1.68 3.75-3.75-1.68-3.75-3.75-3.75z"/>
 ) : (
 <path d="M12 4.5C7 4.5 2.73 7.61 0 12c2.73 4.39 7 7.5 12 7.5s9.27-3.11 12-7.5c-2.73-4.39-7-7.5-12-7.5zm0 13c-3.15 0-5.75-2.6-5.75-5.75S8.85 6.25 12 6.25s5.75 2.6 5.75 5.75-2.6 5.75-5.75 5.75zm0-9.5c-2.07 0-3.75 1.68-3.75 3.75s1.68 3.75 3.75 3.75 3.75-1.68 3.75-3.75-1.68-3.75-3.75-3.75zM2.87 3.51l.71-.71 17.65 17.65-.71.71L2.87 3.51zM1.94 11.23l2.25 2.25c-.2.53-.29 1.1-.29 1.74 0 3.15 2.6 5.75 5.75 5.75.64 0 1.21-.09 1.74-.29l2.25 2.25c-2.73.4-5.59-.72-7.85-2.98C.23 16.4 0 12 0 12s2.73-4.39 7-7.5c.34.25.68.51 1 .77L1.94 11.23z"/>
 )}
</svg>
);

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // State for form inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");

    // State for UI/Feedback
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Get the redirect path from the query parameter
    const query = new URLSearchParams(location.search);
    const redirectPath = query.get('redirect') || "/";

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // --- New function for Google Sign-up ---
    const handleGoogleSignUp = async () => {
        setError("");
        setIsLoading(true);

        try {
            // Set persistence to LOCAL
            await setPersistence(auth, browserLocalPersistence);

            const provider = new GoogleAuthProvider();
            // Optional: Requesting additional scopes like profile information
            // provider.addScope('profile');
            
            const result = await signInWithPopup(auth, provider);
            
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            
            // The signed-in user info.
            console.log("User registered with Google:", result.user);
            
            // Redirect user to the intended path
            navigate(decodeURIComponent(redirectPath));

        } catch (err) {
            console.error("Google Registration Error:", err.message);
            // Handle specific errors like 'auth/popup-closed-by-user'
            if (err.code === 'auth/popup-closed-by-user') {
                setError('Google sign-up was cancelled.');
            } else if (err.code === 'auth/cancelled-popup-request') {
                // This can happen if a popup is already open
                setError('A sign-up window is already open. Please complete or close it.');
            } else {
                setError('Google sign-up failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    }
    // ------------------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        
        setIsLoading(true);

        try {
            // Set persistence to LOCAL before creating the user
            await setPersistence(auth, browserLocalPersistence);

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            
            console.log("User registered successfully:", userCredential.user);
            
            // Redirect user to the intended path
            navigate(decodeURIComponent(redirectPath)); 
        } catch (err) {
            console.error("Firebase Registration Error:", err.message);
            // Display a user-friendly error message
            if (err.code === 'auth/weak-password') {
                setError('Password should be at least 6 characters.');
            } else if (err.code === 'auth/email-already-in-use') {
                setError('That email address is already in use.');
            } else {
                setError('Registration failed. Please check your details.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formBox}>
                <h1>Register</h1>
                
                {/* Google Sign-up Button */}
                <button 
                    style={{...styles.button, ...styles.googleButton}} 
                    onClick={handleGoogleSignUp} 
                    disabled={isLoading}
                    type="button" // Use type="button" to prevent form submission
                >
                    {isLoading ? "Redirecting..." : "Sign up with Google"}
                </button>
                {/* Separator */}
                <p style={styles.separator}>OR</p>
                {/* Email/Password Form */}
                <form onSubmit={handleSubmit}>
                    <input 
                        style={styles.input} 
                        type="text" 
                        placeholder="Full Name" 
                        required 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        disabled={isLoading}
                    />
                    <input 
                        style={styles.input} 
                        type="email" 
                        placeholder="Email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />

                    {/* Password Input */}
                    <div style={styles.passwordInputContainer}>
                        <input
                            style={styles.passwordInput}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            aria-label="Password"
                        />
                        <EyeIcon 
                            onClick={togglePasswordVisibility} 
                            isVisible={showPassword} 
                            style={styles.eyeIcon} 
                        />
                    </div>

                    {/* Confirm Password Input */}
                    <div style={styles.passwordInputContainer}>
                        <input
                            style={styles.passwordInput}
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={isLoading}
                            aria-label="Confirm Password"
                        />
                        <EyeIcon 
                            onClick={togglePasswordVisibility} 
                            isVisible={showPassword} 
                            style={styles.eyeIcon} 
                        />
                    </div>
                    
                    {/* Display Error Message */}
                    {error && (
                        <p style={styles.errorText}>
                            {error} 
                        </p>
                    )}

                    <button style={styles.button} type="submit" disabled={isLoading}>
                        {isLoading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p style={{marginTop: '30px'}}>
                    Already have an account? <a href={`/login${location.search}`} style={{ color: "rgb(0, 212, 212)" }}>Login</a>
                </p>
            </div>
        </div>
    );
};

// Updated Styles object to include Google button styles and a separator style
const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #e2e2e2, #c9d6ff)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    },
    formBox: {
        background: "rgba(18, 32, 75, 0.8)", 
        padding: "40px",
        borderRadius: "10px",
        textAlign: "center",
        color: "white",
        width: "370px",
    },
    input: {
        display: "block",
        margin: "15px auto",
        padding: "15px",
        width: "90%",
        borderRadius: "5px",
        border: "none",
        boxSizing: "border-box", 
    },
    passwordInputContainer: {
        position: "relative",
        margin: "15px auto",
        width: "90%",
    },
    passwordInput: { 
        padding: "15px",
        paddingRight: "45px", 
        width: "100%",
        borderRadius: "5px",
        border: "none",
        boxSizing: "border-box",
        display: "block",
    },
    eyeIcon: {
        position: "absolute",
        right: "15px", 
        top: "50%",
        transform: "translateY(-50%)",
        transition: 'color 0.2s',
    },
    button: { 
        padding: "15px 25px",
        marginTop: "20px",
        backgroundColor: "rgb(0, 212, 212)",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        width: "90%",
        fontSize: "18px",
        fontWeight: "bold",
        transition: 'background-color 0.2s',
    },
    googleButton: {
        backgroundColor: '#4285F4', // Google's blue color
        marginTop: "0px",
        marginBottom: "20px",
    },
    separator: {
        color: '#ccc',
        textAlign: 'center',
        margin: '20px 0',
        fontSize: '1em',
    },
    errorText: {
        color: 'rgb(255, 100, 100)',
        margin: '10px 0',
        fontSize: '0.9em',
        fontWeight: 'bold',
    },
};

export default Register;