import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import { 
    signInWithEmailAndPassword, 
    setPersistence, 
    browserLocalPersistence,
    GoogleAuthProvider, // <-- NEW
    signInWithPopup // <-- NEW
} from "firebase/auth"; 
import { auth } from "../firebase"; 

// Simple Eye Icon SVG Component (Unchanged)
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

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation(); 

    const query = new URLSearchParams(location.search);
    const redirectPath = query.get('redirect') || "/"; 

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // --- Google Sign-in Handler ---
    const handleGoogleSignIn = async () => {
        setError("");
        setIsLoading(true);

        try {
            await setPersistence(auth, browserLocalPersistence);

            const provider = new GoogleAuthProvider();
            
            const result = await signInWithPopup(auth, provider);
            
            // ⭐ Access the profile picture URL here if needed for custom logic,
            //    but it's automatically available in the user object for global listeners.
            const googlePhotoURL = result.user.photoURL;
            console.log("User Photo URL:", googlePhotoURL);
            
            navigate(decodeURIComponent(redirectPath));

        } catch (err) {
            console.error("Google Sign-in Error:", err.message);
            if (err.code === 'auth/popup-closed-by-user') {
                setError('Google sign-in was cancelled.');
            } else {
                setError('Google sign-in failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    }
    // ------------------------------------------

    // --- Email/Password Sign-in Handler ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            await setPersistence(auth, browserLocalPersistence);

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
        
            navigate(decodeURIComponent(redirectPath)); 

        } catch (err) {
            console.error("Firebase Login Error:", err.message);
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                setError('Invalid email or password.');
            } else {
                setError('Login failed. Please check your network or try again.');
            }
        } finally {
            setIsLoading(false); 
        }
    };


    return (
        <div style={styles.container}>
            <div style={styles.formBox}>
                <h1>Login</h1>
                
                {/* Google Sign-in Button */}
                <button 
                    style={{...styles.button, ...styles.googleButton}} 
                    onClick={handleGoogleSignIn} 
                    disabled={isLoading}
                    type="button" 
                >
                    {isLoading ? "Redirecting..." : "Sign in with Google"}
                </button>
                {/* Separator */}
                <p style={styles.separator}>OR</p>

                <form onSubmit={handleSubmit}>
                    <input 
                        style={styles.input} 
                        type="email" 
                        placeholder="Email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading} 
                    />

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

                    {error && (
                        <p style={styles.errorText}>
                            {error} 
                        </p>
                    )}

                    <button style={styles.button} type="submit" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>


                <p style={styles.registerLink}>
                    Don't have an account? <a href={`/register${location.search}`} style={{ color: "rgb(0, 212, 212)" }}>Register</a>
                </p>
            </div>
        </div>
    );
};

// ---
// CSS STYLES (Updated to include Google button and separator styles)
// ---
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
    registerLink: {
        marginTop: '30px'
    }
};

export default Login;