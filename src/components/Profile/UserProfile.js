import classes from "./UserProfile.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const UserProfile = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/");
  };
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <button onClick={logoutHandler}>Logout</button>
    </section>
  );
};

export default UserProfile;
