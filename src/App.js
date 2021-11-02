import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact>
          <AuthPage />
        </Route>
        {authCtx.isLoggedIn && (
          <Route path="/profile">
            <UserProfile />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
