import React from 'react';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Sabores de Iguazú</h3>
            <p className="text-primary-200 mb-4">
              Productos artesanales de la mejor calidad, elaborados con pasión y tradición en la provincia de Misiones, Argentina.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-300 hover:text-white transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-300 hover:text-white transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-300 hover:text-white transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-300 hover:text-white transition-colors duration-200">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Productos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors duration-200">Dulces</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors duration-200">Infusiones</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors duration-200">Repostería</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors duration-200">Licores</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors duration-200">Mieles</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors duration-200">Inicio</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors duration-200">Sobre Nosotros</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors duration-200">Contacto</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors duration-200">Preguntas Frecuentes</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors duration-200">Envíos</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Contacto</h4>
            <address className="text-primary-300 not-italic">
              <p className="mb-2">Av. Misiones 1234</p>
              <p className="mb-2">Puerto Iguazú, Misiones</p>
              <p className="mb-2">Argentina</p>
              <p className="mb-2">+54 3757 123456</p>
              <p></p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-primary-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-300 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Sabores de Iguazú. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4 text-sm text-primary-300">
            <a href="#" className="hover:text-white transition-colors duration-200">Términos y Condiciones</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;