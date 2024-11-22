import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeView from "./components/HomeView";
import CustomerView from "./components/CustomerView";
import NotFound from "./components/utils/NotFound";

const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    const expTime = decoded.exp * 1000;
    return expTime > Date.now();
  } catch (error) {
    return false;
  }
};

const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem("jwtToken");

  if (true) {
    // hardcode sementara
    return element;
  } else {
    return <Navigate to="/" />;
  }
};

const Layout = ({ children, theme, setTheme }) => {
  const location = useLocation();
  const usingNavbar = ["/"]; // list router that using navbar
  const hideNavbar = !usingNavbar.includes(location.pathname);
  return (
    <>
      {!hideNavbar && <Navbar setTheme={setTheme} theme={theme} />}
      {children}
    </>
  );
};

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light"); // if there is no theme object, default to light

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <div data-theme={theme}>
        <Layout theme={theme} setTheme={setTheme}>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route
              path="/customer"
              element={
                <PrivateRoute
                  element={<CustomerView setTheme={setTheme} theme={theme} />}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
