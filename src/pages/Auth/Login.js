import React, { useState } from 'react';
import { Box, Flex, Heading, Input, Button, Text, Link, useToast, FormControl, FormLabel, FormErrorMessage, Divider } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../../components/firebase/Firebase';
import backgroundImage from '../../assets/backgroundImage.jpg';

const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setEmailError('');
    setPasswordError('');

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(false);
        toast({
          title: 'Login Successful',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/');
      })
      .catch((error) => {
        toast({
          title: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);

        if (error.message.includes('email')) {
          setEmailError(error.message);
        } else if (error.message.includes('password')) {
          setPasswordError(error.message);
        }
      });
  };

  const signInWithGoogle = (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        toast({
          title: 'Login Successful',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/');
      })
      .catch((error) => {
        toast({
          title: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex justify="center" align="center" h="100vh" bg={`url(${backgroundImage}) no-repeat center/cover`} bgSize="cover">
      <Box w="400px" p={6} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white">
        <Heading mb={1} fontWeight="bold" fontSize="3xl">
          Login
        </Heading>
        <Text mb={6} color="gray.500">To get started</Text>
        <form onSubmit={handleLogin}>
          <FormControl isInvalid={!!emailError} mb={4}>
            
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              bg="gray.100"
              borderRadius="md"
              height="50px"
              _placeholder={{ color: 'gray.500' }}
            />
            {emailError && <FormErrorMessage>{emailError}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!passwordError} mb={2}>
            
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              bg="gray.100"
              borderRadius="md"
              height="50px"
              _placeholder={{ color: 'gray.500' }}
            />
            {passwordError && <FormErrorMessage>{passwordError}</FormErrorMessage>}
          </FormControl>
          <Link href="/forgot-password" color="gray.500" mb={4} display="block" textAlign="left">
            Forgot Password?
          </Link>
          <Button colorScheme="blue" w="full" type="submit" height="50px" borderRadius="md" isLoading={isLoading} fontWeight="bold" fontSize="lg">
            Continue
          </Button>
        </form>

        <Divider my={6} />

        <Button colorScheme="red" w="full" height="50px" borderRadius="md" fontWeight="bold" fontSize="lg" onClick={signInWithGoogle}>
          Sign in with Google
        </Button>

        <Text mt={4} textAlign="center">
          New User? <Link href="/register" color="blue.500" fontWeight="bold">Register</Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Login;
