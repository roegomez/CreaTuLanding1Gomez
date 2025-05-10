import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import CartWidget from './CartWidget';
import CartModal from './CartModal';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchValue);
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="flex-shrink-0 flex items-center space-x-2 hover:opacity-90 transition-opacity duration-200">
                <img 
                  src="https://ia601201.us.archive.org/4/items/logo_20250509_20250509_2113/logo.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Mate Logo" 
                  className="h-10 w-auto object-contain"
                />
                <h1 className="text-2xl font-bold text-primary-700 font-serif"></h1>
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  className="pl-3 pr-10 py-2 rounded-full border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400 hover:text-primary-600">
                  <Search className="h-5 w-5" />
                </button>
              </form>
              
              <div className="flex space-x-6 text-sm font-medium">
                <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-primary-500">Inicio</a>
                <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-primary-500">Productos</a>
                <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-primary-500">Sobre Nosotros</a>
                <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-primary-500">Contacto</a>
              </div>
              
              <div className="flex items-center">
                <CartWidget onClick={() => setIsCartOpen(true)} />
              </div>
            </div>

            <div className="flex items-center md:hidden">
              <div className="mr-4">
                <CartWidget onClick={() => setIsCartOpen(true)} />
              </div>
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 focus:outline-none"
              >
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <form onSubmit={handleSearchSubmit} className="relative mb-3">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchValue}
                onChange={handleSearchChange}
                className="w-full pl-3 pr-10 py-2 rounded-full border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400 hover:text-primary-600">
                <Search className="h-5 w-5" />
              </button>
            </form>
            
            <a href="#" className="block py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-md px-3">Inicio</a>
            <a href="#" className="block py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-md px-3">Productos</a>
            <a href="#" className="block py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-md px-3">Sobre Nosotros</a>
            <a href="#" className="block py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-md px-3">Contacto</a>
          </div>
        </div>
      </nav>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default NavBar;