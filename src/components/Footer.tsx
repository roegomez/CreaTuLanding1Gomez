import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6">Sabores de Iguazú</h3>
            <p className="text-primary-200 mb-6 leading-relaxed">
              Productos artesanales de la mejor calidad, elaborados con pasión y tradición en la provincia de Misiones, Argentina.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-primary-300 hover:text-white transition-colors duration-200 transform hover:scale-110">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-primary-300 hover:text-white transition-colors duration-200 transform hover:scale-110">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-primary-300 hover:text-white transition-colors duration-200 transform hover:scale-110">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-primary-300 hover:text-white transition-colors duration-200 transform hover:scale-110">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Productos</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors duration-200 flex items-center">Dulces</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors duration-200 flex items-center">Infusiones</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors duration-200 flex items-center">Repostería</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors duration-200 flex items-center">Licores</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors duration-200 flex items-center">Mieles</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Enlaces</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors duration-200 flex items-center">Inicio</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors duration-200 flex items-center">Sobre Nosotros</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors duration-200 flex items-center">Contacto</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors duration-200 flex items-center">Preguntas Frecuentes</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors duration-200 flex items-center">Envíos</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Contacto</h4>
            <address className="text-primary-300 not-italic space-y-3">
              <p className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary-400" />
                Av. Misiones 1234
              </p>
              <p className="flex items-center">
                Puerto Iguazú, Misiones
              </p>
              <p className="flex items-center">
                Argentina
              </p>
              <p className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary-400" />
                +54 3757 123456
              </p>
              <p className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary-400" />
                info@saboresdeiguazu.com
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-primary-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-300 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Sabores de Iguazú. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 text-sm text-primary-300">
            <a href="#" className="hover:text-white transition-colors duration-200">Términos y Condiciones</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;