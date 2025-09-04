import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState("home");

  // Scrollspy: update URL fragment and activeSection
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
      { threshold: 0.5 } // section is active when 60% visible
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Scroll to section
  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const handleMemberClick = () => {
    window.location.href = "/signup"; // keep it as a normal page navigation
  };

  return (
    <NavContainer>
      <NavLeft>
        <StyledLogoLink onClick={() => handleNavClick("home")}>
          <Logo src="assets/DONOURLY/1.png" alt="DONOURLY Logo" />
          <LogoText>DONOURLY</LogoText>
        </StyledLogoLink>

        <StyledNavLink
          $isActive={activeSection === "about"}
          onClick={() => handleNavClick("about")}
        >
          About us
        </StyledNavLink>
        <StyledNavLink
          $isActive={activeSection === "whomwehelp"}
          onClick={() => handleNavClick("whomwehelp")}
        >
          Whom we help
        </StyledNavLink>
        <StyledNavLink
          $isActive={activeSection === "contact"}
          onClick={() => handleNavClick("contact")}
        >
          Contact
        </StyledNavLink>
      </NavLeft>

      <NavRight>
        <NotificationIcon src="assets/Icons/Bell.png" alt="Notifications" />
        <MemberButton onClick={handleMemberClick}>Be a Member</MemberButton>
      </NavRight>
    </NavContainer>
  );
};

// --- Styled Components (unchanged from OG Navbar) ---
const NavContainer = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  box-sizing: border-box;
  z-index: 10;
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
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

const LogoText = styled.h1`
  font-size: 34px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  margin: 0;
`;

const StyledNavLink = styled.button<{ $isActive?: boolean }>`
  font-size: 16px;
  color: ${(props) => (props.$isActive ? "#dfdfdf" : "#fff")};
  text-decoration: none;
  cursor: pointer;
  background: none;
  border: none;
  font-weight: ${(props) => (props.$isActive ? 600 : 500)};
  transition: color 0.3s ease;

  &:hover {
    color: #dfdfdf;
  }
`;

const NotificationIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const MemberButton = styled.button`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0c0c0c;
    color: white;
  }
`;

export default Navbar;
