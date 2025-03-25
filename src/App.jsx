import "./App.css";
import { Drawer } from "./components/Drawer";
import { Header } from "./components/Header";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <Drawer />
    </>
  );
}

export default App;
