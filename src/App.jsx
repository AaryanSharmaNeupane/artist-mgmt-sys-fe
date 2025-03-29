import "./App.css";
import { Header } from "./components/Header";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Drawer } from "./components/Drawer";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Login } from "./pages/Login";

const Layout = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <ToastContainer />
      {isAuthenticated ? (
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
