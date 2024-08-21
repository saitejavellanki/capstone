import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import Home from './pages/home/Home';
import Navbar from './Components/navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';


function App() {
  return (
    <ChakraProvider>
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </BrowserRouter>
      
    </div>
    </ChakraProvider>
  );
}

export default App;
