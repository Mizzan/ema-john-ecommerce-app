import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
  createUserWithEmailAndPassword,
  handleFbSignIn,
  handleGoogleSignIn,
  handleSignOut,
  initializeLoginFrameWork,
  signInWithEmailAndPassword,
} from "./LoginManager";

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    error: "",
    success: false,
  });

  initializeLoginFrameWork();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const signOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };
  const fbSignIn = () => {
    handleFbSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      console.log(isFieldValid);
    }
    if (e.target.name === "password") {
      const isFieldValid =
        e.target.value.length > 6 && /\d{1}/.test(e.target.value);
      console.log(isFieldValid);
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
    e.preventDefault();
  };

  const formStyle = {
    width: "400px",
    margin: "0 auto",
    marginTop: "50px",
    paddingBottom: "50px",
  };
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <div className="center">
        {!user.isSignIn ? (
          <button onClick={googleSignIn}>Sign In With Google</button>
        ) : (
          <button onClick={signOut}>Sign Out</button>
        )}
      </div>
      {user.isSignIn && (
        <div className="desc">
          <img src={user.photo} alt="" />
          <h1>Welcome {user.name}</h1>
          <h4>Your email: {user.email}</h4>
        </div>
      )}

      <br />

      <button onClick={fbSignIn}>Sign in using Facebook</button>

      <h1>Our Own Authentication</h1>

      <input
        type="checkbox"
        name="newUserRegistration"
        id="newUserRegistration"
        onChange={() => setNewUser(!newUser)}
      />
      <label htmlFor="newUserRegistration">New User Registration</label>
      <form style={formStyle} onSubmit={handleSubmit}>
        <fieldset>
          {newUser && (
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              onBlur={handleBlur}
            />
          )}
          <br />
          <input
            onBlur={handleBlur}
            // disabling the email type for using the regex
            // type="email"
            type="text"
            name="email"
            placeholder="Enter your email"
            required
          />
          <br />
          <input
            onBlur={handleBlur}
            required
            type="password"
            name="password"
            placeholder="Enter your password"
          />
        </fieldset>
        <button type="submit">{newUser ? "Sign up" : "Lgo In"}</button>
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "created" : "logged in"} successfully.
        </p>
      )}
    </div>
  );
}

export default Login;
