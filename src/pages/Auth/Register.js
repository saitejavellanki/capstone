import React, { useState } from 'react';
import { Box, Flex, Heading, Input, Button, Text, Link, useToast, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../components/firebase/Firebase';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const auth = getAuth(app);

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      toast({
        title: 'Passwords do not match',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(false);
        toast({
          title: 'Registration Successful',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/login');
      })
      .catch((error) => {
        toast({
          title: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
      });
  };

  const formBackgroundColor = useColorModeValue('white', 'gray.700');

  return (
    <Flex justify="center" align="center" h="100vh" bg="gray.100">
      <Box
        w="400px"
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg={formBackgroundColor}
      >
        <Heading mb={4} fontWeight="bold" fontSize="2xl">
          Register
        </Heading>
        <Text mb={6} color="gray.500">To get started</Text>
        <form onSubmit={handleRegister}>
          <Input
            mb={4}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            bg="gray.100"
            borderRadius="md"
            height="50px"
          />
          <Input
            mb={4}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            bg="gray.100"
            borderRadius="md"
            height="50px"
          />
          <Input
            mb={4}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            bg="gray.100"
            borderRadius="md"
            height="50px"
          />
          <Button
            colorScheme="blue"
            w="full"
            type="submit"
            height="50px"
            borderRadius="md"
            fontWeight="bold"
            fontSize="lg"
          >
            Continue
          </Button>
        </form>
        <Text mt={4} textAlign="center">
          Already Have an account? <Link href="/login" color="blue.500" fontWeight="bold">Login</Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Register;
