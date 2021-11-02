import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";

const AuthForm = () => {
  const history = useHistory();
  const userNameInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredUserName = userNameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const url = "https://myphysio.digitaldarwin.in/api/login/";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        uid: enteredUserName,
        password: enteredPassword,
        blocked: 0,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data);
        history.replace("/profile");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <section className={classes.auth}>
      <h1>PHYSIOAI</h1>
      <h2>Welcome Back!</h2>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="userName">* Username</label>
          <input type="text" id="userName" required ref={userNameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">* Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>Login</button>}
          {isLoading && <p>Sending request...</p>}
          <button type="button" className={classes.toggle}>
            Forgot Password?
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
