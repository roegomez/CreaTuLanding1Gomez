import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import NotFound from './components/NotFound';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-[#f6f6f6] flex flex-col">
          <NavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<ItemListContainer greeting="Descubre los sabores auténticos" />} />
              <Route path="/category/:categoryId" element={<ItemListContainer greeting="Productos por categoría" />} />
              <Route path="/item/:itemId" element={<ItemDetailContainer />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckoutForm />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;