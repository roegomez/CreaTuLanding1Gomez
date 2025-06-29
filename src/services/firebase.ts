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

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: parseInt(doc.id), ...doc.data() } as Product);
    });
    return products;
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

// Get products by category
export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, 'products'), 
      where('category', '==', categoryId)
    );
    const querySnapshot = await getDocs(q);
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: parseInt(doc.id), ...doc.data() } as Product);
    });
    return products;
  } catch (error) {
    console.error('Error getting products by category:', error);
    throw error;
  }
};

// Get single product
export const getProduct = async (id: string): Promise<Product> => {
  try {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: parseInt(docSnap.id), ...docSnap.data() } as Product;
    } else {
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
};

// Create order
export const createOrder = async (order: Omit<Order, 'id'>): Promise<string> => {
  try {
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