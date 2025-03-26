import "./App.css";
import { Header } from "./components/Header";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Drawer } from "./components/Drawer";
import { Navigate, Route, Router, Routes, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Login } from "./pages/Login";

const Layout = () => {
  const { token } = useAuth();
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      <ToastContainer />
      {!isAuthPage && token ? (
        <>
          <Header />
          <Drawer />
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

export default App;
