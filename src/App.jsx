import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from '../src/components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Footer from '../src/components/Footer';

const App = () => {
 
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(()=> {
    localStorage.setItem("cart" , JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart((cart) => {
      const existingItem = cart.find((item) => item.id === product.id)
      if(existingItem) {
        return cart.map((item) =>
        item.id === product.id ? {...item, quantity: item.quantity + 1} : item)
      }
      else {
        return [...cart , { ...product , quantity:1}]
      }
    })
  }

  const removeItemFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const updateQuantity = ( id , quantity) => {
    setCart((cart) => 
      cart.map( (item) =>
          item.id === id ? {...item, quantity: Math.max(1, quantity)} : item
      ) 
    )
  }

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0 )  

  return (

      <Router>
        <NavBar totalItems={totalItems}/>
        <Routes>
          <Route path="/" element={<Home addToCart={ addToCart } />} />
          <Route path="/cart" element={<Cart cart={cart}
            setCart = {setCart}
            addToCart={addToCart} 
            updateQuantity={updateQuantity}
            totalItems={totalItems} 
            totalPrice={totalPrice}
            removeItemFromCart={removeItemFromCart} />} />
          <Route path="/checkout" element={<Checkout totalItems={totalItems} totalPrice={totalPrice}/>} />
        </Routes>
        <Footer/>
      </Router>
  );
};

export default App;