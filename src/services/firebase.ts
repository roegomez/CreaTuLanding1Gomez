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
import { products as fallbackProducts } from '../data/products';

// Simulate network delay for better UX
const simulateNetworkDelay = () => new Promise(resolve => setTimeout(resolve, 500));

// Check if Firebase is properly configured
const isFirebaseConfigured = () => {
  try {
    return db && db.app && db.app.options.projectId && 
           db.app.options.projectId !== "your-project-id" && 
           db.app.options.apiKey !== "your-api-key-here";
  } catch (error) {
    console.warn('Firebase configuration check failed:', error);
    return false;
  }
};

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  console.log('🔍 Getting all products...');
  
  try {
    if (!isFirebaseConfigured()) {
      console.log('📦 Firebase not configured, using local data');
      await simulateNetworkDelay();
      console.log('✅ Returning', fallbackProducts.length, 'products from local data');
      return fallbackProducts;
    }

    console.log('🔥 Attempting to fetch from Firebase...');
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: parseInt(doc.id), ...doc.data() } as Product);
    });
    
    console.log('✅ Firebase products fetched:', products.length);
    return products.length > 0 ? products : fallbackProducts;
  } catch (error) {
    console.error('❌ Error getting products from Firebase, using local data:', error);
    await simulateNetworkDelay();
    return fallbackProducts;
  }
};

// Get products by category
export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  console.log('🏷️ Getting products for category:', categoryId);
  
  try {
    if (!isFirebaseConfigured()) {
      console.log('📦 Firebase not configured, filtering local data for category:', categoryId);
      await simulateNetworkDelay();
      const filtered = fallbackProducts.filter(product => 
        product.category.toLowerCase() === categoryId.toLowerCase()
      );
      console.log('✅ Returning', filtered.length, 'products for category:', categoryId);
      return filtered;
    }

    console.log('🔥 Attempting to fetch category from Firebase...');
    const q = query(
      collection(db, 'products'), 
      where('category', '==', categoryId.toLowerCase())
    );
    const querySnapshot = await getDocs(q);
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: parseInt(doc.id), ...doc.data() } as Product);
    });
    
    console.log('✅ Firebase category products fetched:', products.length);
    
    // If no products found in Firebase, use fallback
    if (products.length === 0) {
      console.log('📦 No products found in Firebase for category, using local data');
      return fallbackProducts.filter(product => 
        product.category.toLowerCase() === categoryId.toLowerCase()
      );
    }
    
    return products;
  } catch (error) {
    console.error('❌ Error getting products by category from Firebase, using local data:', error);
    await simulateNetworkDelay();
    return fallbackProducts.filter(product => 
      product.category.toLowerCase() === categoryId.toLowerCase()
    );
  }
};

// Get single product
export const getProduct = async (id: string): Promise<Product> => {
  console.log('🔍 Getting product with ID:', id);
  
  try {
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      throw new Error('Invalid product ID');
    }

    if (!isFirebaseConfigured()) {
      console.log('📦 Firebase not configured, searching local data for product:', id);
      await simulateNetworkDelay();
      const product = fallbackProducts.find(p => p.id === numericId);
      if (!product) {
        console.log('❌ Product not found in local data:', id);
        throw new Error('Product not found');
      }
      console.log('✅ Product found in local data:', product.name);
      return product;
    }

    console.log('🔥 Attempting to fetch product from Firebase...');
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log('✅ Firebase product fetched');
      return { id: parseInt(docSnap.id), ...docSnap.data() } as Product;
    } else {
      console.log('📦 Product not found in Firebase, trying local data');
      const product = fallbackProducts.find(p => p.id === numericId);
      if (!product) {
        console.log('❌ Product not found in local data either:', id);
        throw new Error('Product not found');
      }
      console.log('✅ Product found in local data:', product.name);
      return product;
    }
  } catch (error) {
    console.error('❌ Error getting product, trying local data:', error);
    const numericId = parseInt(id);
    const product = fallbackProducts.find(p => p.id === numericId);
    if (!product) {
      console.log('❌ Product not found anywhere:', id);
      throw new Error('Product not found');
    }
    console.log('✅ Product found in local data as fallback:', product.name);
    return product;
  }
};

// Create order
export const createOrder = async (order: Omit<Order, 'id'>): Promise<string> => {
  console.log('📝 Creating order...');
  
  try {
    if (!isFirebaseConfigured()) {
      console.log('📦 Firebase not configured, simulating order creation');
      await new Promise(resolve => setTimeout(resolve, 1500));
      const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      console.log('✅ Mock order created:', orderId);
      return orderId;
    }

    console.log('🔥 Attempting to create order in Firebase...');
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

    console.log('✅ Firebase order created:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error creating order:', error);
    throw error;
  }
};