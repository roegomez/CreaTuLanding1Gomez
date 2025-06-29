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

// Get all products
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

// Get products by category
export const getProductsByCategory = async (categoryId) => {
  try {
    const q = query(
      collection(db, 'products'), 
      where('category', '==', categoryId)
    );
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    console.error('Error getting products by category:', error);
    throw error;
  }
};

// Get single product
export const getProduct = async (id) => {
  try {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
};

// Create order
export const createOrder = async (order) => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...order,
      date: new Date(),
      status: 'generated'
    });

    // Update stock for each product
    for (const item of order.items) {
      const productRef = doc(db, 'products', item.id);
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