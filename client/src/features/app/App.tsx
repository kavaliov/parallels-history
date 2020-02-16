import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "features";
import { AppContext, appReducer, appState } from "duck";
import { useRoutes } from "routes";
import { useAuth } from "hooks";
import { Loader } from "components";

const App: React.FC = () => {
  const { login, logout, token, userId, ready } = useAuth();
  const [state, dispatch] = React.useReducer(appReducer, appState);
  const isAuth = !!token;
  const routes = useRoutes(isAuth);

  if (!ready) {
    return <Loader />;
  }

  return (
    <AppContext.Provider
      value={{ state, dispatch, login, logout, token, userId, isAuth }}
    >
      <Router>
        <Layout>{routes}</Layout>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
