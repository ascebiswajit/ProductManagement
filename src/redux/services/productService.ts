import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, where, query } from '@react-native-firebase/firestore';

interface Product {
  id?: string;
  name: string;
  userId: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  image: string;
}

const db = getFirestore();

export const addProduct = async (product: Product): Promise<Product> => {
  const docRef = await addDoc(collection(db, 'products'), product);
  return { id: docRef.id, ...product };
};

export const editProduct = async (product: Product): Promise<Product> => {
  const productRef = collection(db, 'products').doc(product.id)
  const docRef = await updateDoc(productRef, product);
  return product;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'products', id));
};

export const fetchProducts = async (userId: string): Promise<Product[]> => {
  const querySnapshot = await getDocs(
    query(collection(db, 'products'), where('userId', '==', userId))
  );
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};