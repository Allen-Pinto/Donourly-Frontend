import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const navbarHeight = 80; 
    const elementPosition = element.offsetTop - navbarHeight;

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
};


export const useScrollToSection = () => {
  const navigate = useNavigate();

  const goToSection = (sectionId: string) => {
    const routeMap: { [key: string]: string } = {
      home: "/",
      about: "/about",
      whomwehelp: "/whomwehelp",
      options: "/options",
      contact: "/contact",
    };

    const route = routeMap[sectionId];
    if (route) {
      navigate(route);
    } else {
      // fallback: same-page smooth scroll
      scrollToSection(sectionId);
    }
  };

  return { goToSection };
};

export const useActiveSection = (sections: string[]) => {
  const [activeSection, setActiveSection] = useState(sections[0] || '');

  useEffect(() => {
    const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id) {
              setActiveSection(id);
            }
          }
        });
      },
      {
        threshold: 0.6, // section is active when 60% visible
        rootMargin: '-10% 0px -10% 0px' // add some margin to avoid rapid switching
      }
    );

    sectionElements.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  return activeSection;
};