import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import ErrorPage from "./pages/ErrorPage";
import Adventure from "./pages/Adventure";
import CreateAccount from "./pages/CreateAccount";
import SignIn from "./pages/SignIn";
import HomePage from "./pages/HomePage";
import UploadSection from "./pages/UploadSection";
import NotificationPage from "./pages/NotificationPage";
import UserProfile from "./pages/UserProfile";
import ContactUs from "./pages/ContactUs";
import { AuthProvider } from "./Store/auth";
import { useAuth } from "./Store/auth";
import { ToastContainer, Zoom } from "react-toastify";
import Chatpage from "../chat-module/Chatpage";
import Peoples from "./pages/Peoples";
// import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Zoom}
        />
    </BrowserRouter>
  );
}

function MainApp() {
  const location = useLocation();
  const { isLoggedIn } = useAuth();


  const hideNavbarPaths = ["/", "/create-account", "/sign-in"];

  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
  console.log(isLoggedIn,"isLoggedIn")
  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Adventure />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/sign-in" element={<SignIn />} />
        {isLoggedIn && (
          <>
            <Route path="/home-page" element={<HomePage />} />
            <Route path="/upload-section" element={<UploadSection />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/messages" element={<Chatpage/>} />
            <Route path="/peoples" element={<Peoples/>}/>
          </>
        )}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
