import React, {  useState, useEffect } from "react";
import { auth} from "../Config/Firebase";
import "./Login.css";

function Password({ handleCloseLoginModal, email }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to store login error message
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status

  const handleLogin = () => {
    setError("");
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("User logged in successfully!");
        handleCloseLoginModal();
        setLoggedIn(true); // Set login status to true
      })
      .catch((error) => {
        setError("Invalid email or password. Please try again."); // Display login error
        console.error("Error logging in:", error);
      });
  };
  const handleForgotPassword = () => {
    setError(""); // Clear any previous errors

    // Send password reset email
    auth.sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset email sent successfully.");
        // Optionally, show a message to the user that an email has been sent
      })
      .catch((error) => {
        setError("Error sending password reset email. Please try again.");
        console.error("Error sending password reset email:", error);
      });
  };
  // Close the dialog box when the user is successfully logged in
  useEffect(() => {
    if (loggedIn) {
      handleCloseLoginModal();
    }
  }, [loggedIn, handleCloseLoginModal]);
  return (
    <div className="form-container">
      <div className="form-box">
      <svg
        id="Layer_1"
        version="1.1"
        viewBox="0 0 18 18"
        x="0px"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        y="0px"
        data-test="apple-logo"
        className="layout-onboarding-auth__apple-icon"
      >
        <path
          d="M8.8,5.2c-0.7,0-1.8-0.8-3-0.8c-1.5,0-2.9,0.9-3.7,2.3c-1.6,2.8-0.4,6.8,1.1,9.1C4,16.8,4.9,18,6.1,18c1.1,0,1.6-0.7,3-0.7
          c1.4,0,1.8,0.7,3,0.7c1.2,0,2-1.1,2.8-2.2c0.9-1.3,1.2-2.5,1.2-2.6c0,0-2.4-0.9-2.4-3.6c0-2.3,1.9-3.4,1.9-3.4
          c-1.1-1.6-2.7-1.7-3.3-1.8C10.7,4.2,9.5,5.2,8.8,5.2z M11.3,2.9c0.6-0.8,1.1-1.8,0.9-2.9c-0.9,0-2,0.6-2.6,1.4C9,2,8.5,3.1,8.6,4.1
          C9.6,4.2,10.7,3.6,11.3,2.9"
        ></path>
      </svg>
        <h2>Sign In</h2>
        <label htmlFor="password">Enter your Password.</label>
        <input
          id="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password here"
          className="input-field"
        /> <div  className="login__container">
        <p>Your Apple ID information is used to allow you to sign in securely and access your data. Apple records certain data for security, support, and reporting purposes. If you agree, Apple may also use your Apple ID information to send you marketing emails and communications, including based on your use of Apple services. See how your data is managed...</p>
      </div>
        <span className="forgot-passwd" onClick={handleForgotPassword}>Forgot Apple ID or Password?</span>
        {error && <p className="error-message">{error}</p>}
        <button className="submit-btn" onClick={handleLogin}>
            Sign In
          </button>
       
      </div>
    </div>
  );
}

export default Password;