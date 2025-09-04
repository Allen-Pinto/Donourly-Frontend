import React from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Navbar";
import Navbar2 from "./Navbar2";
import ParallaxNavbar from "./ParallaxNavbar"; 

interface Props {
  children: React.ReactNode;
}

const PageWrapper: React.FC<Props> = ({ children }) => {
  const location = useLocation();

  // Show Navbar only on Home and Content pages
  const isHome = location.pathname === "/";
  const isContentPage = ["/about", "/whomwehelp", "/contact", "/options", "/form-navbar"].includes(location.pathname);

  return (
    <>
      {(isHome || isContentPage) && (
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname + "-navbar"}
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ position: "sticky", top: 0, zIndex: 10 }}
          >
            {isHome ? <Navbar /> : <Navbar2 />}
          </motion.div>
        </AnimatePresence>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname + "-page"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default PageWrapper;
