import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  console.log("App Rendering");

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;