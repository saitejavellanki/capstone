import React, { useState, useEffect } from 'react';
import { 
  Container, 
  VStack, 
  Heading, 
  Box, 
  Text, 
  Button, 
  Divider,
  HStack,
  Image,
  useToast,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Stack
} from '@chakra-ui/react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [groupedItems, setGroupedItems] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedShop, setSelectedShop] = useState(null);
  const toast = useToast();
  const firestore = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart items from localStorage
    const loadCart = () => {
      const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(savedCart);
      
      // Group items by shop
      const grouped = savedCart.reduce((acc, item) => {
        const shopId = item.shopId;
        if (!acc[shopId]) {
          acc[shopId] = {
            items: [],
            shopName: item.shopName,
            total: 0
          };
        }
        acc[shopId].items.push(item);
        acc[shopId].total += item.price * item.quantity;
        return acc;
      }, {});
      
      setGroupedItems(grouped);
    };

    loadCart();
  }, []);

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    
    // Update grouped items
    const grouped = updatedCart.reduce((acc, item) => {
      const shopId = item.shopId;
      if (!acc[shopId]) {
        acc[shopId] = {
          items: [],
          shopName: item.shopName,
          total: 0
        };
      }
      acc[shopId].items.push(item);
      acc[shopId].total += item.price * item.quantity;
      return acc;
    }, {});
    
    setGroupedItems(grouped);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    
    // Update grouped items
    const grouped = updatedCart.reduce((acc, item) => {
      const shopId = item.shopId;
      if (!acc[shopId]) {
        acc[shopId] = {
          items: [],
          shopName: item.shopName,
          total: 0
        };
      }
      acc[shopId].items.push(item);
      acc[shopId].total += item.price * item.quantity;
      return acc;
    }, {});
    
    setGroupedItems(grouped);
  };

  const handlePlaceOrder = async (shopId, shopData) => {
    setSelectedShop({ id: shopId, ...shopData });
    onOpen();
  };

  const confirmOrder = async () => {
    try {
      const orderData = {
        shopId: selectedShop.id,
        shopName: selectedShop.shopName,
        items: selectedShop.items,
        total: selectedShop.total,
        status: 'pending',
        paymentStatus: 'pending',
        customerEmail: JSON.parse(localStorage.getItem('user'))?.email,
        createdAt: new Date(),
      };

      // Add order to Firestore
      await addDoc(collection(firestore, 'orders'), orderData);

      // Remove ordered items from cart
      const updatedCart = cartItems.filter(item => item.shopId !== selectedShop.id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);

      toast({
        title: 'Order Placed Successfully',
        description: 'Your order has been sent to the vendor',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      const newDocRef = await addDoc(collection(firestore, 'orders'), orderData);

      navigate('/order-waiting', { state: { orderId: newDocRef.id } });

      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to place order. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container maxW="container.xl" py={8}>
        <Alert status="info">
          <AlertIcon />
          Your cart is empty. Start shopping to add items!
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading size="xl">Shopping Cart</Heading>

        {Object.entries(groupedItems).map(([shopId, shopData]) => (
          <Box 
            key={shopId}
            borderWidth="1px"
            borderRadius="lg"
            p={6}
            bg="white"
          >
            <Heading size="lg" mb={4}>{shopData.shopName}</Heading>
            
            <VStack spacing={4} align="stretch">
              {shopData.items.map((item) => (
                <Box key={item.id}>
                  <HStack spacing={4} justify="space-between">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      boxSize="100px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                    
                    <VStack flex={1} align="start">
                      <Text fontWeight="bold">{item.name}</Text>
                      <Text color="gray.600">${item.price.toFixed(2)} each</Text>
                    </VStack>
                    
                    <HStack>
                      <Button
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <Text>{item.quantity}</Text>
                      <Button
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </HStack>
                    
                    <Text fontWeight="bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                    
                    <Button
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 />
                    </Button>
                  </HStack>
                  <Divider mt={4} />
                </Box>
              ))}
              
              <Box pt={4}>
                <HStack justify="space-between">
                  <Text fontSize="xl" fontWeight="bold">
                    Total for {shopData.shopName}:
                  </Text>
                  <Text fontSize="xl" fontWeight="bold" color="green.600">
                    ${shopData.total.toFixed(2)}
                  </Text>
                </HStack>
                
                <Button
                  colorScheme="blue"
                  size="lg"
                  width="full"
                  mt={4}
                  onClick={() => handlePlaceOrder(shopId, shopData)}
                >
                  Place Order
                </Button>
              </Box>
            </VStack>
          </Box>
        ))}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Order</ModalHeader>
          <ModalBody>
            <Stack spacing={4}>
              <Text>Shop: {selectedShop?.shopName}</Text>
              <Text fontWeight="bold">
                Total Amount: ${selectedShop?.total.toFixed(2)}
              </Text>
              <Text>Please confirm your order to proceed to payment.</Text>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={confirmOrder}>
              Confirm Order
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Cart;