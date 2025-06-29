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

// Fallback data in case Firebase is not configured
const fallbackProducts: Product[] = [
  {
    id: 1,
    name: "Dulce de Leche Artesanal",
    description: "Dulce de leche tradicional elaborado con leche fresca de la región. Textura cremosa y sabor auténtico que te transportará a la infancia.",
    price: 850,
    category: "dulces",
    image: "https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=800",
    stock: 25
  },
  {
    id: 2,
    name: "Yerba Mate Premium",
    description: "Yerba mate de primera calidad, cosechada en los mejores yerbales de Misiones. Sabor intenso y duradero para los verdaderos amantes del mate.",
    price: 1200,
    category: "infusiones",
    image: "https://images.pexels.com/photos/7262775/pexels-photo-7262775.jpeg?auto=compress&cs=tinysrgb&w=800",
    stock: 40
  },
  {
    id: 3,
    name: "Alfajores de Maicena",
    description: "Alfajores caseros de maicena rellenos con dulce de leche y coco rallado. Receta familiar transmitida por generaciones.",
    price: 450,
    category: "repostería",
    image: "https://images.pexels.com/photos/8969288/pexels-photo-8969288.jpeg?auto=compress&cs=tinysrgb&w=800",
    stock: 30
  },
  {
    id: 4,
    name: "Licor de Hierbas",
    description: "Licor artesanal elaborado con hierbas aromáticas de la selva misionera. Perfecto como digestivo o para cócteles especiales.",
    price: 2500,
    category: "bebidas",
    image: "https://images.pexels.com/photos/5947043/pexels-photo-5947043.jpeg?auto=compress&cs=tinysrgb&w=800",
    stock: 15
  },
  {
    id: 5,
    name: "Miel de Abeja Pura",
    description: "Miel 100% natural extraída de colmenas ubicadas en la reserva natural. Sin aditivos ni conservantes artificiales.",
    price: 950,
    category: "dulces",
    image: "https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800",
    stock: 20
  },
  {
    id: 6,
    name: "Té de Hierbas Silvestres",
    description: "Mezcla única de hierbas silvestres recolectadas en la selva paranaense. Propiedades relajantes y digestivas naturales.",
    price: 680,
    category: "infusiones",
    image: "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=800",
    stock: 35
  },
  {
    id: 7,
    name: "Empanadas Caseras",
    description: "Empanadas artesanales con masa casera y rellenos tradicionales. Disponibles en carne, pollo, jamón y queso, y verdura.",
    price: 320,
    category: "masas",
    image: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=800",
    stock: 50
  },
  {
    id: 8,
    name: "Chimichurri Artesanal",
    description: "Chimichurri preparado con hierbas frescas y especias seleccionadas. El acompañamiento perfecto para asados y carnes.",
    price: 420,
    category: "condimentos",
    image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800",
    stock: 28
  },
  {
    id: 9,
    name: "Torta Húmeda de Chocolate",
    description: "Torta de chocolate con cobertura de ganache y decoración artesanal. Ideal para celebraciones especiales.",
    price: 1800,
    category: "repostería",
    image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800",
    stock: 12
  },
  {
    id: 10,
    name: "Vino Tinto Regional",
    description: "Vino tinto elaborado con uvas cultivadas en los viñedos de la región. Cuerpo medio con notas frutales y especiadas.",
    price: 3200,
    category: "bebidas",
    image: "https://images.pexels.com/photos/434311/pexels-photo-434311.jpeg?auto=compress&cs=tinysrgb&w=800",
    stock: 18
  },
  {
    id: 11,
    name: "Mermelada de Frutos Rojos",
    description: "Mermelada artesanal elaborada con frutos rojos frescos de la región. Sin conservantes artificiales, pura fruta y azúcar.",
    price: 720,
    category: "dulces",
    image: "https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800",
    stock: 22
  },
  {
    id: 12,
    name: "Café de Especialidad",
    description: "Café de grano seleccionado, tostado artesanalmente. Notas cítricas y achocolatadas con final prolongado.",
    price: 1450,
    category: "infusiones",
    image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=800",
    stock: 33
  }
];

// Check if Firebase is properly configured
const isFirebaseConfigured = () => {
  try {
    return db && db.app && db.app.options.projectId !== "your-project-id";
  } catch (error) {
    return false;
  }
};

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  try {
    if (!isFirebaseConfigured()) {
      console.warn('Firebase not configured, using fallback data');
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return fallbackProducts;
    }

    const querySnapshot = await getDocs(collection(db, 'products'));
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: parseInt(doc.id), ...doc.data() } as Product);
    });
    return products;
  } catch (error) {
    console.error('Error getting products from Firebase, using fallback data:', error);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return fallbackProducts;
  }
};

// Get products by category
export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  try {
    if (!isFirebaseConfigured()) {
      console.warn('Firebase not configured, using fallback data');
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return fallbackProducts.filter(product => 
        product.category.toLowerCase() === categoryId.toLowerCase()
      );
    }

    const q = query(
      collection(db, 'products'), 
      where('category', '==', categoryId.toLowerCase())
    );
    const querySnapshot = await getDocs(q);
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: parseInt(doc.id), ...doc.data() } as Product);
    });
    return products;
  } catch (error) {
    console.error('Error getting products by category from Firebase, using fallback data:', error);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return fallbackProducts.filter(product => 
      product.category.toLowerCase() === categoryId.toLowerCase()
    );
  }
};

// Get single product
export const getProduct = async (id: string): Promise<Product> => {
  try {
    if (!isFirebaseConfigured()) {
      console.warn('Firebase not configured, using fallback data');
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const product = fallbackProducts.find(p => p.id === parseInt(id));
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    }

    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: parseInt(docSnap.id), ...docSnap.data() } as Product;
    } else {
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error('Error getting product from Firebase, trying fallback data:', error);
    // Try fallback data
    const product = fallbackProducts.find(p => p.id === parseInt(id));
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }
};

// Create order
export const createOrder = async (order: Omit<Order, 'id'>): Promise<string> => {
  try {
    if (!isFirebaseConfigured()) {
      console.warn('Firebase not configured, simulating order creation');
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Generate a mock order ID
      return `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

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

    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};