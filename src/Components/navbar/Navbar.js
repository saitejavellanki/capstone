import React from 'react';
import { Box, Flex, Text, Link } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Box bg="black" px={8}>
      <Flex h={20} alignItems="center" justifyContent="space-between">
        <Text color="white" fontSize="4xl" fontWeight="bold" ml={8}>
          FoSt.
        </Text>
        <Flex alignItems="center" mr={8}>
          <Link href="#services" color="white" px={5} fontSize="xl">
            Services
          </Link>
          <Link href="#about-us" color="white" px={5} fontSize="xl">
            About Us
          </Link>
          <Link href="#login" color="white" px={5} fontSize="xl">
            Login
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
