import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 

const MainPage = () => {
  // Dynamic list of shops with image URLs
  const shops = [
    { name: "Shop 1", imageUrl: "https://via.placeholder.com/300x200" },
    { name: "Shop 2", imageUrl: "https://via.placeholder.com/300x200" },
    { name: "Shop 3", imageUrl: "https://via.placeholder.com/300x200" },
    { name: "Shop 4", imageUrl: "https://via.placeholder.com/300x200" },
    { name: "Shop 5", imageUrl: "https://via.placeholder.com/300x200" },
    { name: "Shop 6", imageUrl: "https://via.placeholder.com/300x200" }
  ];

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Box>
      {/* Slider Section */}
      <Box 
        bg="gray.200" 
        mx={4} 
        my={8} 
        p={4} 
        borderRadius="md" 
        border="1px solid blue"
        height="31vh"  // Slider takes up 25% of the screen height
      >
        <Slider {...sliderSettings}>
          <Box bg="blue.500" color="white" p={8} borderRadius="md" height="25vh">
            <Text fontSize="xl" fontWeight="bold">Welcome to Shop 1</Text>
          </Box>
          <Box bg="green.500" color="white" p={8} borderRadius="md" height="25vh">
            <Text fontSize="xl" fontWeight="bold">Discover Shop 2</Text>
          </Box>
          <Box bg="red.500" color="white" p={8} borderRadius="md" height="25vh">
            <Text fontSize="xl" fontWeight="bold">Explore Shop 3</Text>
          </Box>
          {/* Add more slides as needed */}
        </Slider>
      </Box>

      {/* Shops Section */}
      <Flex 
        justify="center" 
        wrap="wrap" 
        gap={8}  // Larger gap between boxes
        p={4} 
        mx={4}
      >
        {shops.map((shop, index) => (
          <Box
            key={index}
            height="250px"  // Increased height for better visual impact
            width="calc(50% - 16px)"  // Ensure two boxes per row with gap
            borderRadius="lg"
            boxShadow="lg"
            position="relative"
            overflow="hidden"
            _hover={{ transform: 'scale(1.05)', transition: 'all 0.3s ease-in-out' }}
            backgroundImage={`url(${shop.imageUrl})`}
            backgroundSize="cover"
            backgroundPosition="center"
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            {/* Overlay to enhance text readability */}
            <Box 
              position="absolute" 
              top="0" 
              left="0" 
              right="0" 
              bottom="0" 
              bg="rgba(0, 0, 0, 0.5)" 
              zIndex="1" 
            />

            <Text 
              fontSize="2xl" 
              fontWeight="bold" 
              color="white" 
              zIndex="2"  // Ensure text is above overlay
              p={4}
              borderRadius="md"
            >
              {shop.name}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default MainPage;
