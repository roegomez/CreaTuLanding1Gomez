import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import CartWidget from './CartWidget';
import CartModal from './CartModal';

const categories = [
  "Dulces",
  "Infusiones",
  "Repostería",
  "Bebidas",
  "Masas",
  "Condimentos"
];

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center space-x-3 group">
                <img 
                  src="https://ia601201.us.archive.org/4/items/logo_20250509_20250509_2113/logo.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Mate Logo" 
                  className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  className="w-64 pl-4 pr-12 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors duration-200">
                  <Search className="h-5 w-5" />
                </button>
              </form>
              
              <div className="flex space-x-6 text-sm font-medium">
                <Link to="/" className="text-gray-700 hover:text-primary-600 transition-all duration-200 py-2 border-b-2 border-transparent hover:border-primary-500">
                  Inicio
                </Link>
                <div className="relative group">
                  <button className="text-gray-700 hover:text-primary-600 transition-all duration-200 py-2 border-b-2 border-transparent hover:border-primary-500">
                    Categorías
                  </button>
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      {categories.map((category) => (
                        <Link
                          key={category}
                          to={`/category/${category.toLowerCase()}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <Link to="/about" className="text-gray-700 hover:text-primary-600 transition-all duration-200 py-2 border-b-2 border-transparent hover:border-primary-500">
                  Sobre Nosotros
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-primary-600 transition-all duration-200 py-2 border-b-2 border-transparent hover:border-primary-500">
                  Contacto
                </Link>
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
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 focus:outline-none transition-colors duration-200"
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

        <div className={`md:hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-4 pt-2 pb-3 space-y-2">
            <form onSubmit={handleSearchSubmit} className="relative mb-4">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchValue}
                onChange={handleSearchChange}
                className="w-full pl-4 pr-12 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors duration-200">
                <Search className="h-5 w-5" />
              </button>
            </form>
            
            <Link to="/" className="block py-2.5 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg px-4 transition-colors duration-200">
              Inicio
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase()}`}
                className="block py-2.5 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg px-4 transition-colors duration-200"
              >
                {category}
              </Link>
            ))}
            <Link to="/about" className="block py-2.5 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg px-4 transition-colors duration-200">
              Sobre Nosotros
            </Link>
            <Link to="/contact" className="block py-2.5 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg px-4 transition-colors duration-200">
              Contacto
            </Link>
          </div>
        </div>
      </nav>

      <div className="h-20"></div>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default NavBar;