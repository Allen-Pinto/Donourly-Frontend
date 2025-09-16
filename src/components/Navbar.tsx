import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  userRole: "donor" | "receiver";
  setUserRole: (role: "donor" | "receiver") => void;
}

const Navbar: React.FC<NavbarProps> = ({ userRole, setUserRole }) => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Detect scroll: switch to black after leaving the top of the page
  useEffect(() => {
    const handleScroll = () => {
      // Check if we've scrolled more than 50px from the top
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on load
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scrollspy: update activeSection + URL hash
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) {
              setActiveSection(id);
              window.history.replaceState(null, "", `/#${id}`);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Scroll to section
  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  // Toggle between donor and receiver
  const handleToggle = () => {
    const newRole = userRole === "donor" ? "receiver" : "donor";
    setUserRole(newRole);
    localStorage.setItem("userRole", newRole);
    
    navigate("/");
    setTimeout(() => {
      const optionsSection = document.getElementById("options");
      if (optionsSection) optionsSection.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <NavContainer $scrolled={scrolled}>
      <NavLeft>
        <StyledLogoLink onClick={() => handleNavClick("home")}>
          <Logo src="assets/DONOURLY/1.png" alt="DONOURLY Logo" />
          <LogoText $scrolled={scrolled}>DONOURLY</LogoText>
        </StyledLogoLink>

        <StyledNavLink
          $isActive={activeSection === "about"}
          $scrolled={scrolled}
          onClick={() => handleNavClick("about")}
        >
          About us
        </StyledNavLink>
        <StyledNavLink
          $isActive={activeSection === "whomwehelp"}
          $scrolled={scrolled}
          onClick={() => handleNavClick("whomwehelp")}
        >
          Whom we help
        </StyledNavLink>
        <StyledNavLink
          $isActive={activeSection === "contact"}
          $scrolled={scrolled}
          onClick={() => handleNavClick("contact")}
        >
          Contact
        </StyledNavLink>
      </NavLeft>

      <NavRight>
        <ToggleContainer>
          <ToggleBackground $userRole={userRole}>
            <ToggleOption 
              $isActive={userRole === "donor"} 
              onClick={handleToggle}
            >
              Donate
            </ToggleOption>
            <ToggleOption 
              $isActive={userRole === "receiver"} 
              onClick={handleToggle}
            >
              Receive
            </ToggleOption>
            <ToggleSlider $userRole={userRole} />
          </ToggleBackground>
        </ToggleContainer>
      </NavRight>
    </NavContainer>
  );
};

// Styled Components
const NavContainer = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  box-sizing: border-box;
  z-index: 1000;
  transition: all 0.3s ease;
  background: ${(props) => (props.$scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent")};
  box-shadow: ${(props) => (props.$scrolled ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none")};
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const StyledLogoLink = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 25px;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const LogoText = styled.h1<{ $scrolled: boolean }>`
  font-size: 34px;
  font-weight: bold;
  color: ${(props) => (props.$scrolled ? "#000" : "#fff")};
  cursor: pointer;
  margin: 0;
  transition: color 0.3s ease;
`;

const StyledNavLink = styled.button<{ $isActive?: boolean; $scrolled: boolean }>`
  font-size: 16px;
  color: ${(props) =>
    props.$scrolled
      ? props.$isActive
        ? "#333"
        : "#666"
      : props.$isActive
      ? "#dfdfdf"
      : "#fff"};
  background: none;
  border: none;
  cursor: pointer;
  font-weight: ${(props) => (props.$isActive ? 600 : 500)};
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => (props.$scrolled ? "#000" : "#dfdfdf")};
  }
`;

const ToggleContainer = styled.div`
  position: relative;
`;

const ToggleBackground = styled.div<{ $userRole: "donor" | "receiver" }>`
  position: relative;
  display: flex;
  background: ${(props) => 
    props.$userRole === "donor" 
      ? "linear-gradient(135deg, #0088ff 0%, #0066cc 100%)"
      : "linear-gradient(135deg, #fdc726 0%, #f0b90b 100%)"
  };
  border-radius: 25px;
  padding: 4px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

const ToggleOption = styled.button<{ $isActive: boolean }>`
  position: relative;
  background: transparent;
  border: none;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 20px;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s ease;
  color: ${(props) => (props.$isActive ? "#333" : "rgba(255, 255, 255, 0.8)")};
  text-shadow: ${(props) => 
    props.$isActive 
      ? "none" 
      : "0 1px 2px rgba(0, 0, 0, 0.3)"
  };
  
  &:hover {
    color: ${(props) => (props.$isActive ? "#333" : "#fff")};
  }
`;

const ToggleSlider = styled.div<{ $userRole: "donor" | "receiver" }>`
  position: absolute;
  top: 4px;
  left: ${(props) => (props.$userRole === "donor" ? "4px" : "50%")};
  width: calc(50% - 4px);
  height: calc(100% - 8px);
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 18px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 2px 10px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    background: linear-gradient(145deg, #ffffff 0%, #f0f1f3 100%);
    border-radius: 14px;
    transition: all 0.3s ease;
  }
`;

export default Navbar;