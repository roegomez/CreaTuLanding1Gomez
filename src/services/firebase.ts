import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  query, 
  where, 
  addDoc,
  updateDoc,
  increment 
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { Product, Order } from '../types';

// Fallback data with reliable image URLs from Unsplash
const fallbackProducts: Product[] = [
  {
    id: 1,
    name: "Dulce de Leche Artesanal",
    description: "Dulce de leche tradicional elaborado con leche fresca de la región. Textura cremosa y sabor auténtico que te transportará a la infancia.",
    price: 850,
    category: "dulces",
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop&crop=center&auto=format",
    stock: 25
  },
  {
    id: 2,
    name: "Yerba Mate Premium",
    description: "Yerba mate de primera calidad, cosechada en los mejores yerbales de Misiones. Sabor intenso y duradero para los verdaderos amantes del mate.",
    price: 1200,
    category: "infusiones",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&h=600&fit=crop&crop=center&auto=format",
    stock: 40
  },
  {
    id: 3,
    name: "Alfajores de Maicena",
    description: "Alfajores caseros de maicena rellenos con dulce de leche y coco rallado. Receta familiar transmitida por generaciones.",
    price: 450,
    category: "repostería",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop&crop=center&auto=format",
    stock: 30
  },
  {
    id: 4,
    name: "Licor de Hierbas",
    description: "Licor artesanal elaborado con hierbas aromáticas de la selva misionera. Perfecto como digestivo o para cócteles especiales.",
    price: 2500,
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800&h=600&fit=crop&crop=center&auto=format",
    stock: 15
  },
  {
    id: 5,
    name: "Miel de Abeja Pura",
    description: "Miel 100% natural extraída de colmenas ubicadas en la reserva natural. Sin aditivos ni conservantes artificiales.",
    price: 950,
    category: "dulces",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&h=600&fit=crop&crop=center&auto=format",
    stock: 20
  },
  {
    id: 6,
    name: "Té de Hierbas Silvestres",
    description: "Mezcla única de hierbas silvestres recolectadas en la selva paranaense. Propiedades relajantes y digestivas naturales.",
    price: 680,
    category: "infusiones",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=600&fit=crop&crop=center&auto=format",
    stock: 35
  },
  {
    id: 7,
    name: "Empanadas Caseras",
    description: "Empanadas artesanales con masa casera y rellenos tradicionales. Disponibles en carne, pollo, jamón y queso, y verdura.",
    price: 320,
    category: "masas",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop&crop=center&auto=format",
    stock: 50
  },
  {
    id: 8,
    name: "Chimichurri Artesanal",
    description: "Chimichurri preparado con hierbas frescas y especias seleccionadas. El acompañamiento perfecto para asados y carnes.",
    price: 420,
    category: "condimentos",
    image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=800&h=600&fit=crop&crop=center&auto=format",
    stock: 28
  },
  {
    id: 9,
    name: "Torta Húmeda de Chocolate",
    description: "Torta de chocolate con cobertura de ganache y decoración artesanal. Ideal para celebraciones especiales.",
    price: 1800,
    category: "repostería",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&h=600&fit=crop&crop=center&auto=format",
    stock: 12
  },
  {
    id: 10,
    name: "Vino Tinto Regional",
    description: "Vino tinto elaborado con uvas cultivadas en los viñedos de la región. Cuerpo medio con notas frutales y especiadas.",
    price: 3200,
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&h=600&fit=crop&crop=center&auto=format",
    stock: 18
  },
  {
    id: 11,
    name: "Mermelada de Frutos Rojos",
    description: "Mermelada artesanal elaborada con frutos rojos frescos de la región. Sin conservantes artificiales, pura fruta y azúcar.",
    price: 720,
    category: "dulces",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop&crop=center&auto=format",
    stock: 22
  },
  {
    id: 12,
    name: "Café de Especialidad",
    description: "Café de grano seleccionado, tostado artesanalmente. Notas cítricas y achocolatadas con final prolongado.",
    price: 1450,
    category: "infusiones",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop&crop=center&auto=format",
    stock: 33
  }
];

// Simulate network delay for better UX
const simulateNetworkDelay = () => new Promise(resolve => setTimeout(resolve, 800));

// Check if Firebase is properly configured
const isFirebaseConfigured = () => {
  try {
    return db && db.app && db.app.options.projectId && db.app.options.projectId !== "your-project-id" && db.app.options.apiKey !== "your-api-key-here";
  } catch (error) {
    console.warn('Firebase configuration check failed:', error);
    return false;
  }
};

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  console.log('Getting all products...');
  
  try {
    if (!isFirebaseConfigured()) {
      console.log('Firebase not configured, using fallback data');
      await simulateNetworkDelay();
      return fallbackProducts;
    }

    console.log('Attempting to fetch from Firebase...');
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: parseInt(doc.id), ...doc.data() } as Product);
    });
    
    console.log('Firebase products fetched:', products.length);
    return products.length > 0 ? products : fallbackProducts;
  } catch (error) {
    console.error('Error getting products from Firebase, using fallback data:', error);
    await simulateNetworkDelay();
    return fallbackProducts;
  }
};

// Get products by category
export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  console.log('Getting products for category:', categoryId);
  
  try {
    if (!isFirebaseConfigured()) {
      console.log('Firebase not configured, using fallback data for category:', categoryId);
      await simulateNetworkDelay();
      return fallbackProducts.filter(product => 
        product.category.toLowerCase() === categoryId.toLowerCase()
      );
    }

    console.log('Attempting to fetch category from Firebase...');
    const q = query(
      collection(db, 'products'), 
      where('category', '==', categoryId.toLowerCase())
    );
    const querySnapshot = await getDocs(q);
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: parseInt(doc.id), ...doc.data() } as Product);
    });
    
    console.log('Firebase category products fetched:', products.length);
    
    // If no products found in Firebase, use fallback
    if (products.length === 0) {
      console.log('No products found in Firebase for category, using fallback');
      return fallbackProducts.filter(product => 
        product.category.toLowerCase() === categoryId.toLowerCase()
      );
    }
    
    return products;
  } catch (error) {
    console.error('Error getting products by category from Firebase, using fallback data:', error);
    await simulateNetworkDelay();
    return fallbackProducts.filter(product => 
      product.category.toLowerCase() === categoryId.toLowerCase()
    );
  }
};

// Get single product
export const getProduct = async (id: string): Promise<Product> => {
  console.log('Getting product with ID:', id);
  
  try {
    if (!isFirebaseConfigured()) {
      console.log('Firebase not configured, using fallback data for product:', id);
      await simulateNetworkDelay();
      const product = fallbackProducts.find(p => p.id === parseInt(id));
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    }

    console.log('Attempting to fetch product from Firebase...');
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log('Firebase product fetched');
      return { id: parseInt(docSnap.id), ...docSnap.data() } as Product;
    } else {
      console.log('Product not found in Firebase, trying fallback');
      const product = fallbackProducts.find(p => p.id === parseInt(id));
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    }
  } catch (error) {
    console.error('Error getting product from Firebase, trying fallback data:', error);
    const product = fallbackProducts.find(p => p.id === parseInt(id));
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }
};

// Create order
export const createOrder = async (order: Omit<Order, 'id'>): Promise<string> => {
  console.log('Creating order...');
  
  try {
    if (!isFirebaseConfigured()) {
      console.log('Firebase not configured, simulating order creation');
      await new Promise(resolve => setTimeout(resolve, 1500));
      const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      console.log('Mock order created:', orderId);
      return orderId;
    }

    console.log('Attempting to create order in Firebase...');
    const docRef = await addDoc(collection(db, 'orders'), {
      ...order,
      date: new Date(),
      status: 'generated'
    });

    // Update stock for each product
    for (const item of order.items) {
      const productRef = doc(db, 'products', item.id.toString());
      await updateDoc(productRef, {
        stock: increment(-item.quantity)
      });
    }

    console.log('Firebase order created:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};