import React from 'react';
import { Box, Flex, Text, Button, Image } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate('/main');
  };

  return (
    <Box bg="white" px={12} pt={20} height="calc(100vh - 80px)">
      <Flex alignItems="center" justifyContent="space-between">
        {/* Text Section */}
        <Box mr={10} p={4}>
          <Text fontSize="5xl" fontWeight="extrabold" mb={6} lineHeight="shorter">
            Order right from your <br/>table !!
          </Text>
          <Text fontSize="2xl" mb={8} lineHeight="taller">
            Use <Text as="span" fontWeight="bold" color="red">FOST</Text> for faster deliveries. <br />
            And quick <Text as="span" fontWeight="bold" color="red">orders</Text>.
          </Text>
          <Button
            colorScheme="green"
            rightIcon={<ArrowForwardIcon />}
            borderRadius="full"
            size="lg"
            onClick={handleOrderClick}
            _hover={{ transform: 'scale(1.2)', transition: 'all 0.2s ease-in-out' }}
          >
            Make a order
          </Button>
        </Box>

        <Box ml={10} p={4}>
          <Image
            src="https://via.placeholder.com/400" 
            alt="Food image"
            borderRadius="lg"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
