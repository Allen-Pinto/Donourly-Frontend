import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from "react-router-dom";

interface Props {}

const Home: React.FC<Props> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Parallax scroll effects
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const carouselY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yellowCircleY = useTransform(scrollYProgress, [0, 1], [0, -300]);

  // Preload images to fix carousel sizing issue
  useEffect(() => {
    const imageUrls = [
      "assets/Carousel/1.jpg",
      "assets/Carousel/2.jpg", 
      "assets/Carousel/3.jpg",
      "assets/Carousel/4.jpg",
      "assets/Carousel/5.jpg"
    ];

    const preloadImages = async () => {
      const imagePromises = imageUrls.map(url => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = url;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        // Set to true anyway to show carousel
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const dummyText = [
    `Helping people is simple and meaningful. When you choose to give, you are not just donating an item—you are changing someone's life in a very real way. Here's how your support can make the biggest difference:`,
    `Support Children's Education: Many children cannot afford basic school supplies. You can donate notebooks, pens, pencils, school bags, storybooks, and art materials. These small contributions help them continue their education with hope and confidence.`,
    `Strengthen Families at Home: Families often need essentials that make a house feel like a home. Bedsheets, blankets, pillows, or even simple furniture like chairs and tables can bring comfort and dignity to their daily lives.`,
    `Everyday Essentials: Items such as clothes, shoes, kitchen utensils, storage containers, and hygiene kits are always in demand. They allow families to live more comfortably and with self-respect.`,
    `Seasonal Care: You can also help by providing weather-based needs—warm sweaters and quilts in winter, raincoats and umbrellas during monsoons, or fans and water bottles in hot summers.`,
    `Every act of kindness counts. By donating thoughtfully, you directly help children learn better, families live safer, and communities grow stronger. Together, we can bring smiles and hope to those who need it most.`
  ];

  return (
    <Container>
      <HeroSection as={motion.section} style={{ y: heroY }}>
        
        {/* Fixed Carousel with proper loading */}
        <CarouselWrapper as={motion.div} style={{ y: carouselY }} $loaded={imagesLoaded}>
          {imagesLoaded ? (
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              showArrows={true}
              interval={5000}
              transitionTime={500}
              swipeable={false}
              emulateTouch={false}
            >
              <div>
                <CarouselImage 
                  src="assets/Carousel/1.jpg" 
                  alt="Carousel Image 1"
                  onLoad={() => {}} // Prevent individual image load events
                />
              </div>
              <div>
                <CarouselImage 
                  src="assets/Carousel/2.jpg" 
                  alt="Carousel Image 2"
                  onLoad={() => {}}
                />
              </div>
              <div>
                <CarouselImage 
                  src="assets/Carousel/3.jpg" 
                  alt="Carousel Image 3"
                  onLoad={() => {}}
                />
              </div>
              <div>
                <CarouselImage 
                  src="assets/Carousel/4.jpg" 
                  alt="Carousel Image 4"
                  onLoad={() => {}}
                />
              </div>
              <div>
                <CarouselImage 
                  src="assets/Carousel/5.jpg" 
                  alt="Carousel Image 5"
                  onLoad={() => {}}
                />
              </div>
            </Carousel>
          ) : (
            <LoadingPlaceholder>
              <div>Loading...</div>
            </LoadingPlaceholder>
          )}
        </CarouselWrapper>

        <HeroContent
          as={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <HeroTitle>Every child deserves education, safety and dignity and you can help</HeroTitle>
          <HeroStats>4,500+ children die annually in India from waterborne diseases</HeroStats>
          <HeroButtons>
            <HeroButton
              $primary
              onClick={() => {
                const element = document.getElementById("options");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                  window.history.replaceState(null, "", "/#options");
                }
              }}
            >
              DONATE NOW
            </HeroButton>
            <HeroButton onClick={handleOpenModal}>HELP PEOPLE</HeroButton>
          </HeroButtons>
        </HeroContent>

        <YellowCircleImage 
          as={motion.img}
          style={{ y: yellowCircleY }}
          src="assets/DONOURLY/3.png" 
          alt="Statistics Graphic"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />
      </HeroSection>

      {/* Categories */}
      <ContentSection
        as={motion.section}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <CategoryGrid>
          {[
            { src: "assets/Icons/1-scholar.png", title: "Education", desc: "Supporting learning by giving children access to books and knowledge" },
            { src: "assets/Icons/2-Gadgets.png", title: "Gadgets", desc: "Providing smart gadgets to help children learn, play, and grow" },
            { src: "assets/Icons/3-Household.png", title: "Household", desc: "Essential items that turn houses into homes for families in need" },
            { src: "assets/Icons/4-Stationery.png", title: "Stationary", desc: "Equipping young minds with tools to write, draw, and dream" }
          ].map((item, index) => (
            <CategoryItem
              key={index}
              as={motion.div}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <CategoryImage src={item.src} alt={`${item.title} Icon`} />
              <CategoryTitle>{item.title}</CategoryTitle>
              <CategoryDescription>{item.desc}</CategoryDescription>
            </CategoryItem>
          ))}
        </CategoryGrid>
      </ContentSection>

      {/* Modal */}
      {isModalOpen && (
        <ModalOverlay
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseModal}
        >
          <ModalContent
            as={motion.div}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            {dummyText.map((para, i) => (
              <ModalText key={i}>{para}</ModalText>
            ))}
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

// Styled Components

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  font-family: 'Poppins', sans-serif;
  color: #333;
  overflow-x: hidden;
  overflow-y: hidden;
  position: relative;
`;

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 60vh; 
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
`;

const LoadingPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #f0f0f0 25%, transparent 25%), 
              linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), 
              linear-gradient(45deg, transparent 75%, #f0f0f0 75%), 
              linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  
  div {
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 20px 40px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: 500;
  }
`;

/* Fixed Carousel */
const CarouselWrapper = styled.div<{ $loaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60vh;
  opacity: ${props => props.$loaded ? 1 : 0};
  transition: opacity 0.5s ease;

  .carousel-root {
    width: 100%;
    height: 100%;
    position: relative;
    
    .carousel {
      width: 100%;
      height: 100%;
      position: relative;
    }
  }

  .slide {
    height: 60vh !important;
    position: relative;
    display: flex !important;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .slide img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
  }

  /* Dark overlay */
  .slide::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.65);
    z-index: 2;
  }

  /* Fix carousel controls */
  .carousel .control-arrow {
    z-index: 10;
  }

  .carousel .carousel-status {
    z-index: 10;
  }

  /* Ensure proper sizing on load */
  .carousel-slider {
    height: 100% !important;
  }

  .slider-wrapper {
    height: 100% !important;
  }

  .slider {
    height: 100% !important;
  }
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 5;
  color: white;
  padding-left: 100px;
  padding-right: 200px;
  margin-top: 250px;
`;

const HeroTitle = styled.h2`
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 20px;
  color: white;
`;

const HeroStats = styled.p`
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 40px;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 15px;
`;

const HeroButton = styled.button<{ $primary?: boolean }>`
  background-color: #000;
  color: #fff;
  border: 2px solid #000;
  padding: 12px 25px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: white;
    color: black;
    border-color: #000;
    box-shadow: 3px 3px 20px #abaaab;
  }

  ${(props) =>
    !props.$primary &&
    `
      &:hover {
        background-color: #000;
        color: #FDC726;
        border-color: #000;
      }
  `}
`;

const YellowCircleImage = styled.img`
  position: absolute;
  top: 280px;
  right: -100px;
  width: 500px;
  height: 500px;
  z-index: 1;
  object-fit: cover;
`;

const ContentSection = styled.section`
  flex: 1;
  padding: 10px 50px;
  background-color: transparent; 
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  justify-items: center;
`;

const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 250px;
`;

const CategoryImage = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 5px;
`;

const CategoryTitle = styled.h3`
  font-family: 'Playfair Display', serif; 
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const CategoryDescription = styled.p`
  font-family: 'Playfair Display', serif;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`;

/* Modal */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 40px;
  max-width: 700px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  color: white;
  text-align: left;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 25px;
  background: transparent;
  border: none;
  font-size: 3rem;
  font-weight: 300;
  color: white;
  cursor: pointer;
`;

const ModalText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  text-align: justify;
  margin-bottom: 1rem;
`;

export default Home;