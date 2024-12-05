import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

import Auth from "./pages/auth";
// import LinkPage from "./pages/linkPage";
import UserList from "./pages/homePage";
// import NewBook from "./pages/newBook";

function App() {

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route
            exact path="/"
            element={isAuth ? <UserList /> : <Auth />}
          />
          {/* <Route
            exact path="/new-book"
            element={isAuth ? <NewBook pageType="new" title="New Book" submitText="Create" /> : <Navigate to="/" />}
          />
          <Route
            exact path="/book/:id"
            element={isAuth ? <NewBook pageType="view" title="Book Details" submitText="Home" /> : <Navigate to="/" />}
          />
          <Route
            exact path="/update/:id"
            element={isAuth ? <NewBook pageType="update" title="Update Details" submitText="Update" /> : <Navigate to="/" />}
          /> */}
        </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
