import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
//importing react slick slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { animateScroll } from "react-scroll";
import NavBar from "./components/organs/NavBar"
import Home from "./components/pages/Home";
import Footer from "./components/organs/Footer";
import Contact from "./components/pages/ContactPage";
import AboutPage from "./components/pages/AboutUsPage";
import GalleryPage from "./components/pages/GalleryPage";
import JoinPage from "./components/pages/Join";

function App() {

  const directory = useLocation();
  useEffect(() => {
    animateScroll.scrollToTop({
      duration: 0,
    });
  }, [directory.pathname]);

  return (
    <div className="w-full h-full bg-zinc-900 font-nunito relative">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/join" element={<JoinPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
