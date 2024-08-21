
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import Home from './pages/home/Home';
import Navbar from './Components/navbar/Navbar';

function App() {
  return (
    <ChakraProvider>
    <div>
      <Navbar/>
      <Home/>
    </div>
    </ChakraProvider>
  );
}

export default App;
