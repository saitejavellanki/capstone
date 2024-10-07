import React from 'react';
import { Box, Flex, Text, Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box bg="black" px={8}>
      <Flex h={20} alignItems="center" justifyContent="space-between">
      <NavLink to="/" style={{ textDecoration: 'none' }}>
          <Text color="white" fontSize="4xl" fontWeight="bold" ml={8}>
            FoSt.
          </Text>
        </NavLink>
        <Flex alignItems="center" mr={8}>
        <NavLink to="/services" style={{ color: 'white', padding: '0 20px', fontSize: 'xl' }}>
            Services
          </NavLink>
          <NavLink to="/about-us" style={{ color: 'white', padding: '0 20px', fontSize: 'xl' }}>
            About Us
          </NavLink>
          <NavLink to="/login" style={{ color: 'white', padding: '0 20px', fontSize: 'xl' }}>
            Login
          </NavLink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
