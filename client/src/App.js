import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {BrowserRouter as Router, Routes, Route, Navigate,} from "react-router-dom";
import { auth } from "./components/Auth/firebase.js";

import Login from "./components/Auth/Login.js";
import SignUp from "./components/Auth/Register.js";
import NewsData from './components/newsdata/NewsData.js';
import NewsAnalysis from "./components/newsAnalysis/NewsAnalysis.js";
import SideBar from "./components/sidebar/SideBar.js";
import Header from "./components/Header.js";
import Footer from "./components/footer.js";
import SavedNews from "./components/pages/SavedNews.js";
import AddNews from "./components/pages/AddNews.js";
import ShowNews from "./components/pages/ShowNews.js";
import ContactForm from "./components/pages/Contact.js";
import UserProfile from "./components/pages/UserProfile.js";
import Analytics from "./components/pages/Analytics.js";
import StartupNews from "./components/newsdata/startupnews.js";
import Nopage from "./components/pages/Nopage.js";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  useEffect(() => {
    document.title = "NewsVoice- News At Your Command"
  }, [])

  return (
    <>
    <Router> 
    {user ? (
      <>
        <SideBar> 
          <Header/>
          <Routes>
            <Route path="/" element={ < NewsData />} />
            <Route path="/NewsData" element={< NewsData />} />
            <Route path="/NewsAnalysis/:url" element={< NewsAnalysis />} />
            <Route path='/startup' element={< StartupNews />}/>
            <Route path='/analytics' element={< Analytics />} />
            <Route path="/addnews" element={< AddNews />} />
            <Route path="/file-manager" element={< ShowNews />} />
            <Route path='/settings/profile' element={< UserProfile />} />
            <Route path='/contact' element={< ContactForm />} />
            <Route path="/saved" element={< SavedNews />} />
            <Route path="*" element={< Nopage />} />
          </Routes>
        </SideBar>
        <Footer/>
      </>
    ): (
      <Routes>
        <Route path="/" element={user ? <Navigate to="/NewsData" /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
      )}
      <ToastContainer />
    </Router>
    </>
  );
}

export default App;