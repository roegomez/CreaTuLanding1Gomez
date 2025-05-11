import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ItemListContainer from './components/ItemListContainer';
import CheckoutSuccess from './components/CheckoutSuccess';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#f6f6f6] flex flex-col">
        <Routes>
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route
            path="/"
            element={
              <>
                <NavBar />
                <main className="flex-grow">
                  <ItemListContainer greeting="Descubre los sabores auténticos" />
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;