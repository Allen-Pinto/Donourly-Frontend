import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface Props {
  isDonateMode?: boolean;
}

const Home: React.FC<Props> = ({ isDonateMode = true }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [carouselImages, setCarouselImages] = useState<string[]>([]);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const carouselY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yellowCircleY = useTransform(scrollYProgress, [0, 1], [0, -300]);

  useEffect(() => {
    const imageUrls = [
      "assets/Carousel/1.webp",
      "assets/Carousel/2.webp", 
      "assets/Carousel/3.webp",
      "assets/Carousel/4.webp",
      "assets/Carousel/5.webp"
    ];

    const preloadImages = async () => {
      const imagePromises = imageUrls.map(url => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(url);
          img.onerror = () => reject(url);
          img.src = url;
        });
      });

      try {
        await Promise.all(imagePromises);
        setCarouselImages(imageUrls);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error preloading WebP images, falling back to JPG:', error);
        // Fallback to JPG if WebP fails
        const jpgUrls = [
          "assets/Carousel/1.jpg",
          "assets/Carousel/2.jpg", 
          "assets/Carousel/3.jpg",
          "assets/Carousel/4.jpg",
          "assets/Carousel/5.jpg"
        ];
        setCarouselImages(jpgUrls);
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
              swipeable={true}
              emulateTouch={true}
              dynamicHeight={false}
            >
              {carouselImages.map((imageUrl, index) => (
                <CarouselSlide key={index}>
                  <CarouselImage 
                    src={imageUrl} 
                    alt={`Carousel Image ${index + 1}`}
                    onError={(e) => {
                      // Fallback to JPG if WebP fails to load
                      const target = e.target as HTMLImageElement;
                      if (imageUrl.includes('.webp')) {
                        target.src = imageUrl.replace('.webp', '.jpg');
                      }
                    }}
                  />
                </CarouselSlide>
              ))}
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
          <HeroTitle>{`Every child deserves education, safety\nand dignity and you can help`}</HeroTitle>
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
              {isDonateMode ? 'DONATE NOW' : 'RECEIVE NOW'}
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

// Your existing styled components remain exactly the same...
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  color: #333;
  overflow-x: hidden;
  position: relative;
`;

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 60vh;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  padding-top: 0;

  @media (max-width: 1024px) {
    height: 55vh;
    min-height: 450px;
  }

  @media (max-width: 768px) {
    height: 80vh;
    min-height: 600px;
  }

  @media (max-width: 480px) {
    height: 85vh;
    min-height: 650px;
  }
`;

const LoadingPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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

    @media (max-width: 480px) {
      padding: 15px 30px;
      font-size: 16px;
    }
  }
`;

const CarouselWrapper = styled.div<{ $loaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => props.$loaded ? 1 : 0};
  transition: opacity 0.5s ease;

  .carousel-root {
    width: 100%;
    height: 100%;
  }

  .carousel {
    height: 100%;
  }

  .carousel-slider {
    height: 100% !important;
  }

  .slider-wrapper,
  .slider {
    height: 100% !important;
  }

  .slide {
    height: 100% !important;
    background: #000;
  }

  .control-arrow {
    z-index: 10;
    
    @media (max-width: 768px) {
      display: none !important;
    }
  }

  .carousel-status {
    z-index: 10;
  }

  .control-dots {
    z-index: 10;
    margin-bottom: 10px;

    @media (max-width: 480px) {
      margin-bottom: 5px;
    }
  }
`;

const CarouselSlide = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.65);
    z-index: 2;

    @media (max-width: 768px) {
      background-color: rgba(0, 0, 0, 0.55);
    }
  }
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 5;
  color: white;
  padding: 0 100px;
  max-width: 1400px;
  width: 100%;

  @media (max-width: 1200px) {
    padding: 0 60px;
  }

  @media (max-width: 768px) {
    padding: 0 40px;
    text-align: center;
  }

  @media (max-width: 480px) {
    padding: 0 20px;
  }
`;

const HeroTitle = styled.h2`
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  margin-top: 16.7rem;
  margin-bottom: 20px;
  color: white;
  white-space: pre-line;

  @media (max-width: 1200px) {
    font-size: 42px;
    margin-top: 14rem;
  }

  @media (max-width: 1024px) {
    font-size: 36px;
    margin-top: 12rem;
  }

  @media (max-width: 768px) {
    font-size: 28px;
    margin-top: 8rem;
    margin-bottom: 15px;
    line-height: 1.3;
  }

  @media (max-width: 480px) {
    font-size: 22px;
    margin-top: 6rem;
    margin-bottom: 12px;
  }

  @media (max-width: 360px) {
    font-size: 20px;
    margin-top: 5rem;
  }
`;

const HeroStats = styled.p`
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    font-size: 17px;
    margin-bottom: 35px;
  }

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 25px;
    line-height: 1.4;
  }

  @media (max-width: 360px) {
    font-size: 13px;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 12px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
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
  white-space: nowrap;
  flex: 0 1 auto;

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

  @media (max-width: 768px) {
    font-size: 15px;
    padding: 11px 22px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 10px 20px;
    flex: 1 1 calc(50% - 5px);
    min-width: 140px;
  }

  @media (max-width: 360px) {
    font-size: 13px;
    padding: 9px 18px;
    min-width: 120px;
  }
`;

const YellowCircleImage = styled.img`
  position: absolute;
  top: 280px;
  right: -100px;
  width: 500px;
  height: 500px;
  z-index: 1;
  object-fit: cover;

  @media (max-width: 1200px) {
    width: 400px;
    height: 400px;
    right: -80px;
    top: 250px;
  }

  @media (max-width: 1024px) {
    width: 350px;
    height: 350px;
    right: -60px;
    top: 200px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ContentSection = styled.section`
  flex: 1;
  padding: 60px 50px;
  background-color: transparent;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    padding: 50px 40px;
  }

  @media (max-width: 768px) {
    padding: 40px 30px;
  }

  @media (max-width: 480px) {
    padding: 30px 20px;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  justify-items: center;
  max-width: 1200px;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 35px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }

  @media (max-width: 360px) {
    gap: 20px;
  }
`;

const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 250px;
  width: 100%;

  @media (max-width: 768px) {
    max-width: 200px;
  }

  @media (max-width: 480px) {
    max-width: 160px;
  }
`;

const CategoryImage = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    width: 38px;
    height: 38px;
    margin-bottom: 8px;
  }

  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
  }

  @media (max-width: 360px) {
    width: 32px;
    height: 32px;
  }
`;

const CategoryTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 6px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }

  @media (max-width: 360px) {
    font-size: 15px;
  }
`;

const CategoryDescription = styled.p`
  font-family: 'Playfair Display', serif;
  font-size: 14px;
  color: #666;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    line-height: 1.4;
  }

  @media (max-width: 360px) {
    font-size: 11px;
  }
`;

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
  padding: 20px;

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 40px;
  max-width: 700px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  color: white;

  @media (max-width: 768px) {
    padding: 30px;
    max-width: 90%;
    max-height: 75vh;
  }

  @media (max-width: 480px) {
    padding: 25px 20px;
    border-radius: 15px;
    max-height: 70vh;
  }

  @media (max-width: 360px) {
    padding: 20px 15px;
  }
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
  line-height: 1;
  z-index: 10;

  @media (max-width: 768px) {
    font-size: 2.75rem;
    right: 20px;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
    right: 15px;
    top: 10px;
  }

  @media (max-width: 360px) {
    font-size: 2.25rem;
    right: 10px;
  }
`;

const ModalText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  text-align: justify;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    text-align: left;
    line-height: 1.5;
  }

  @media (max-width: 360px) {
    font-size: 0.85rem;
  }
`;

export default Home;