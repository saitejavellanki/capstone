import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Main from './pages/main/Main';


function App() {
  return (
    <ChakraProvider>
    <div>
      
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/main" element={<Main/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </BrowserRouter>
      
    </div>
    </ChakraProvider>
  );
}

export default App;
