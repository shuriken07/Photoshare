import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Sidebar from "./sidebar/Sidebar";
import Header from "./sidebar/Header";
import Footer from "./sidebar/Footer";
import Posts from "./component/Posts";
import CreatePost from "./component/CreatePost";
import VerifyEmail from "./component/VerifyEmail";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/publicRoute";
import { UserProvider } from "./context/UserContext";
const Login = lazy(() => import("./component/Login"));
const Signup = lazy(() => import("./component/Signup"));
const Dashboard = lazy(() => import("./component/Dashboard"));
function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar />
        <div className="main">
          <Header />
          <main className="content">
            <Suspense fallback={<h2>Loading...</h2>}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <PublicRoute>
                      <Signup />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/verify/:token"
                  element={<VerifyEmail />}
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/createpost"
                  element={
                    <ProtectedRoute>
                      <CreatePost />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/posts"
                  element={
                    <ProtectedRoute>
                      <Posts />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}
export default App;