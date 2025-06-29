export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Dulce de Leche Artesanal",
    description: "Dulce de leche tradicional elaborado con leche fresca de la región. Textura cremosa y sabor auténtico que te transportará a la infancia.",
    price: 850,
    category: "dulces",
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
    stock: 25
  },
  {
    id: 2,
    name: "Yerba Mate Premium",
    description: "Yerba mate de primera calidad, cosechada en los mejores yerbales de Misiones. Sabor intenso y duradero para los verdaderos amantes del mate.",
    price: 1200,
    category: "infusiones",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
    stock: 40
  },
  {
    id: 3,
    name: "Alfajores de Maicena",
    description: "Alfajores caseros de maicena rellenos con dulce de leche y coco rallado. Receta familiar transmitida por generaciones.",
    price: 450,
    category: "repostería",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
    stock: 30
  },
  {
    id: 4,
    name: "Licor de Hierbas",
    description: "Licor artesanal elaborado con hierbas aromáticas de la selva misionera. Perfecto como digestivo o para cócteles especiales.",
    price: 2500,
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
    stock: 15
  },
  {
    id: 5,
    name: "Miel de Abeja Pura",
    description: "Miel 100% natural extraída de colmenas ubicadas en la reserva natural. Sin aditivos ni conservantes artificiales.",
    price: 950,
    category: "dulces",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
    stock: 20
  },
  {
    id: 6,
    name: "Té de Hierbas Silvestres",
    description: "Mezcla única de hierbas silvestres recolectadas en la selva paranaense. Propiedades relajantes y digestivas naturales.",
    price: 680,
    category: "infusiones",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
    stock: 35
  },
  {
    id: 7,
    name: "Empanadas Caseras",
    description: "Empanadas artesanales con masa casera y rellenos tradicionales. Disponibles en carne, pollo, jamón y queso, y verdura.",
    price: 320,
    category: "masas",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
    stock: 50
  },
  {
    id: 8,
    name: "Chimichurri Artesanal",
    description: "Chimichurri preparado con hierbas frescas y especias seleccionadas. El acompañamiento perfecto para asados y carnes.",
    price: 420,
    category: "condimentos",
    image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
    stock: 28
  },
  {
    id: 9,
    name: "Torta Húmeda de Chocolate",
    description: "Torta de chocolate con cobertura de ganache y decoración artesanal. Ideal para celebraciones especiales.",
    price: 1800,
    category: "repostería",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
    stock: 12
  },
  {
    id: 10,
    name: "Vino Tinto Regional",
    description: "Vino tinto elaborado con uvas cultivadas en los viñedos de la región. Cuerpo medio con notas frutales y especiadas.",
    price: 3200,
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
    stock: 18
  },
  {
    id: 11,
    name: "Mermelada de Frutos Rojos",
    description: "Mermelada artesanal elaborada con frutos rojos frescos de la región. Sin conservantes artificiales, pura fruta y azúcar.",
    price: 720,
    category: "dulces",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
    stock: 22
  },
  {
    id: 12,
    name: "Café de Especialidad",
    description: "Café de grano seleccionado, tostado artesanalmente. Notas cítricas y achocolatadas con final prolongado.",
    price: 1450,
    category: "infusiones",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
    stock: 33
  }
];