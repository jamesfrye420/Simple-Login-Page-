import classes from "./UserProfile.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const UserProfile = () => {
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <button onClick={logoutHandler}>Logout</button>
    </section>
  );
};

export default UserProfile;
