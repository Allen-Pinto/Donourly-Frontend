import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

// Import pages
import Home from "./pages/Home"; // ✅ Only one Home component now!
import About from "./pages/About";
import WhomWeHelp from "./pages/WhomWeHelp";
import Contact from "./pages/Contact";
import Option from "./pages/forms/Option";
import Option2 from "./pages/forms/Option2";
import Donour from "./pages/forms/Donour";
import Receiver from "./pages/forms/Receiver";
import Ask from "./pages/forms/Ask";

// Import components
import LoaderScreen from "./components/LoaderScreen";
import RoleSelection from "./components/RoleSelection";
import Navbar from "./components/Navbar";
import FormNavbar from "./components/FormNavbar";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<'donor' | 'receiver' | null>(null);
  const [showRoleSelection, setShowRoleSelection] = useState(false);

  // Check for existing role in localStorage on app start
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') as 'donor' | 'receiver' | null;
    console.log('🔍 Checking saved role:', savedRole);
    
    // FOR TESTING: Force clear to see role selection - remove this line once satisfied
    localStorage.removeItem('userRole');
    
    const cleanRole = localStorage.getItem('userRole') as 'donor' | 'receiver' | null;
    if (cleanRole && (cleanRole === 'donor' || cleanRole === 'receiver')) {
      console.log('✅ Found valid saved role:', cleanRole);
      setUserRole(cleanRole);
    } else {
      console.log('❌ No valid saved role found');
      localStorage.removeItem('userRole');
    }
  }, []);

  const handleLoadingComplete = () => {
    console.log('🔄 Loading completed, userRole:', userRole);
    setIsLoading(false);
    
    // If no userRole after loading, show role selection
    if (!userRole) {
      setShowRoleSelection(true);
    }
  };

  const handleRoleSelect = (role: 'donor' | 'receiver') => {
    console.log('🎯 Role selected:', role);
    setUserRole(role);
    setShowRoleSelection(false);
    localStorage.setItem('userRole', role);
  };

  console.log('🏠 App state:', { isLoading, userRole, showRoleSelection });

  // Show loader first
  if (isLoading) {
    console.log('⏳ Showing loader...');
    return <LoaderScreen onLoadingComplete={handleLoadingComplete} />;
  }

  // Show role selection if no role is selected OR forced to show
  if (showRoleSelection || !userRole) {
    console.log('👤 Showing role selection...');
    return (
      <RoleSelectionWrapper>
        <RoleSelection onRoleSelect={handleRoleSelect} />
      </RoleSelectionWrapper>
    );
  }

  console.log('🚀 Showing main app with role:', userRole);

  // Main app with role-based routing
  const ParallaxHomePage = () => {
    return (
      <ParallaxContainer>
        <ParallaxBackground
          as={motion.div}
          style={{ y: 0 }}
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        <ScrollContainer>
          <SectionWrapper id="home">
            {/* ✅ Single Home component with isDonateMode prop */}
            <Home isDonateMode={userRole === 'donor'} />
          </SectionWrapper>

          <SectionWrapper id="about">
            <About />
          </SectionWrapper>

          <SectionWrapper id="whomwehelp">
            <WhomWeHelp />
          </SectionWrapper>

          <SectionWrapper id="options">
            {userRole === 'donor' ? <Option /> : <Option2 />}
          </SectionWrapper>

          <SectionWrapper id="contact">
            <Contact />
          </SectionWrapper>
        </ScrollContainer>
      </ParallaxContainer>
    );
  };

  const FormNavbarPage = () => {
    const [activeButton, setActiveButton] = useState(userRole || "donor");

    const handleButtonClick = (button: string) => {
      setActiveButton(button as 'donor' | 'receiver');
    };

    return (
      <FormNavbar activeButton={activeButton} onButtonClick={handleButtonClick} />
    );
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PageWrapperWithRole userRole={userRole} setUserRole={setUserRole}>
              <ParallaxHomePage />
            </PageWrapperWithRole>
          }
        />

        <Route
          path="/form-navbar"
          element={
            <PageWrapperWithRole userRole={userRole} setUserRole={setUserRole}>
              <FormNavbarPage />
            </PageWrapperWithRole>
          }
        />

        <Route path="/donour" element={<Donour />} />
        <Route path="/receiver" element={<Receiver />} />
        <Route path="/ask" element={<Ask />} />
      </Routes>
    </Router>
  );
}

// Enhanced PageWrapper with role support
const PageWrapperWithRole: React.FC<{
  children: React.ReactNode;
  userRole: 'donor' | 'receiver';
  setUserRole: (role: 'donor' | 'receiver') => void;
}> = ({ children, userRole, setUserRole }) => {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Navbar userRole={userRole} setUserRole={setUserRole} />
      {children}
    </div>
  );
};

// Styled Components
const RoleSelectionWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

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