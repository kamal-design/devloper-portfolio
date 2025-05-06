import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./sections/Footer";
import { Route, Routes } from "react-router";
import GsapPage from "./pages/gsap";
import FramerMotionPage from "./pages/framer";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <main>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gsap" element={<GsapPage />} />
        <Route path="/framer" element={<FramerMotionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </main>
  );
};

export default App;
