import React, { useState, useEffect } from "react";
import { 
  Box, 
  Flex, 
  Text, 
  Image, 
  VStack, 
  Heading, 
  Spinner, 
  useToast, 
  Grid, 
  GridItem 
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../../components/firebase/Firebase';

const Main = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const firestore = getFirestore(app);
  const toast = useToast();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const shopsRef = collection(firestore, 'shops');
        const snapshot = await getDocs(shopsRef);
        const shopsList = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
        setShops(shopsList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shops:', error);
        setError('Error fetching shops. Please try again later.');
        setLoading(false);
        toast({
          title: 'Error',
          description: 'Could not fetch shops',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchShops();
  }, [firestore, toast]);

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Box p={6} textAlign="center">
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <Box p={6}>
      <Heading mb={6} textAlign="center">Our Shops</Heading>
      {shops.length === 0 ? (
        <Text textAlign="center">No shops available at the moment.</Text>
      ) : (
        <Grid 
          templateColumns={{
            base: "repeat(1, 1fr)", 
            md: "repeat(2, 1fr)", 
            lg: "repeat(3, 1fr)"
          }} 
          gap={6}
        >
          {shops.map((shop) => (
            <GridItem key={shop.id}>
              <Link to={`/shop/${shop.id}`}>
                <Box 
                  borderWidth={1} 
                  borderRadius="lg" 
                  overflow="hidden"
                  boxShadow="md"
                  transition="transform 0.3s ease"
                  _hover={{ 
                    transform: 'scale(1.05)',
                    boxShadow: 'lg'
                  }}
                >
                  <Image 
                    src={shop.imageUrl} 
                    alt={shop.name} 
                    h="250px" 
                    w="100%" 
                    objectFit="cover" 
                  />
                  <Box p={4}>
                    <Heading size="md" textAlign="center">{shop.name}</Heading>
                  </Box>
                </Box>
              </Link>
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Main;
