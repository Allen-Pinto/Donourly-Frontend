import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

// Import pages
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import WhomWeHelp from "./pages/WhomWeHelp.tsx";
import Contact from "./pages/Contact.tsx";
import Option from "./pages/forms/Option.tsx";
import Signup from "./pages/register/Signup.tsx";
import Login from "./pages/register/Login.tsx";
import Donour from "./pages/forms/Donour.tsx";
import Receiver from "./pages/forms/Receiver.tsx";
import Ask from "./pages/forms/Ask.tsx";
import FormNavbar from "./components/FormNavbar.tsx";
import PageWrapper from "./components/PageWrapper.tsx";

// ------------------ Parallax Home Page ------------------
const ParallaxHomePage = () => {
  return (
    <ParallaxContainer>
      {/* Background parallax layer */}
      <ParallaxBackground
        as={motion.div}
        style={{ y: 0 }}
        animate={{ y: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Smooth scroll container */}
      <ScrollContainer>
        <SectionWrapper id="home">
          <Home />
        </SectionWrapper>

        <SectionWrapper id="about">
          <About />
        </SectionWrapper>

        <SectionWrapper id="whomwehelp">
          <WhomWeHelp />
        </SectionWrapper>

        <SectionWrapper id="options">
          <Option />
        </SectionWrapper>

        <SectionWrapper id="contact">
          <Contact />
        </SectionWrapper>
      </ScrollContainer>
    </ParallaxContainer>
  );
};

// ------------------ Form Navbar Page ------------------
const FormNavbarPage = () => {
  const [activeButton, setActiveButton] = useState("donor");

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  return (
    <FormNavbar activeButton={activeButton} onButtonClick={handleButtonClick} />
  );
};

// ------------------ App ------------------
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Home page with Parallax + Navbar */}
        <Route
          path="/"
          element={
            <PageWrapper>
              <ParallaxHomePage />
            </PageWrapper>
          }
        />

        {/* Content pages with Navbar2 */}
        <Route
          path="/form-navbar"
          element={
            <PageWrapper>
              <FormNavbarPage />
            </PageWrapper>
          }
        />

        {/* Form pages (no navbar) */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/donour" element={<Donour />} />
        <Route path="/receiver" element={<Receiver />} />
        <Route path="/ask" element={<Ask />} />
      </Routes>
    </Router>
  );
}

// ------------------ Styled Components ------------------
const ParallaxContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;

const ParallaxBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 120%;
  height: 120%;
  background: url("assets/Map.jpg") no-repeat center/cover;
  opacity: 0.08;
  z-index: -2;
  transform: rotate(180deg);
  will-change: transform;
`;

const ScrollContainer = styled.div`
  position: relative;
  z-index: 1;
`;

const SectionWrapper = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh; 
  display: flex;
  align-items: center; 
  justify-content: center; 


  scroll-margin-top: -90px;
`;

