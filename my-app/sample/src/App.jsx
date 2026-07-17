import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./sidebar/sidebar.css";
import Sidebar from "./sidebar/Sidebar.jsx"
import Header from "./sidebar/Header.jsx"
import Footer from "./sidebar/Footer.jsx";

const Login = lazy(() => import("./component/Login.jsx"));
const Forgot = lazy(() => import("./component/Forgot.jsx"));
function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar />
        <div className="main">
          <Header />
          <main className="content">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/ForgotPassword" element={<Forgot />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>

    </BrowserRouter>
  );
}

export default App;