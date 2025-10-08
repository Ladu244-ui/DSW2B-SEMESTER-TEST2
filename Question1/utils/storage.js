import { database } from '../firebaseConfig';
import { ref, set, get, push, remove, onValue, off } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  // Cart operations using Firebase Realtime Database
  async addToCart(item) {
    try {
      const cartRef = ref(database, `carts/${item.userId}`);
      const existingCart = await this.getCartItems(item.userId);
      const existingItemIndex = existingCart.findIndex(cartItem => cartItem.id === item.id);
      
      let updatedCart;
      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        updatedCart = [...existingCart];
        updatedCart[existingItemIndex].quantity += item.quantity;
      } else {
        // New item, add to cart
        updatedCart = [...existingCart, item];
      }
      
      // Save to Firebase Realtime Database
      await set(cartRef, updatedCart);
      
      // Also save locally for offline support
      await AsyncStorage.setItem(`shopez_cart_${item.userId}`, JSON.stringify(updatedCart));
      
      return updatedCart;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  async getCartItems(userId) {
    try {
      // First try to get from Firebase Realtime Database
      const cartRef = ref(database, `carts/${userId}`);
      const snapshot = await get(cartRef);
      
      if (snapshot.exists()) {
        const firebaseCart = snapshot.val();
        // Also update local storage for offline support
        await AsyncStorage.setItem(`shopez_cart_${userId}`, JSON.stringify(firebaseCart));
        return firebaseCart;
      } else {
        // Fallback to local storage if Firebase data doesn't exist
        const localData = await AsyncStorage.getItem(`shopez_cart_${userId}`);
        return localData ? JSON.parse(localData) : [];
      }
    } catch (error) {
      console.error('Error getting cart items:', error);
      // Fallback to local storage on error
      try {
        const localData = await AsyncStorage.getItem(`shopez_cart_${userId}`);
        return localData ? JSON.parse(localData) : [];
      } catch (localError) {
        return [];
      }
    }
  },

  // Real-time listener for cart changes
  subscribeToCartChanges(userId, callback) {
    const cartRef = ref(database, `carts/${userId}`);
    const unsubscribe = onValue(cartRef, (snapshot) => {
      const cartData = snapshot.exists() ? snapshot.val() : [];
      callback(cartData);
    });
    return unsubscribe;
  },

  // Unsubscribe from cart changes
  unsubscribeFromCartChanges(cartRef) {
    off(cartRef);
  },

  async updateCartItemQuantity(userId, itemId, newQuantity) {
    try {
      const cartRef = ref(database, `carts/${userId}`);
      const existingCart = await this.getCartItems(userId);
      const itemIndex = existingCart.findIndex(item => item.id === itemId);
      
      if (itemIndex >= 0) {
        const updatedCart = [...existingCart];
        updatedCart[itemIndex].quantity = newQuantity;
        
        // Update Firebase Realtime Database
        await set(cartRef, updatedCart);
        
        // Also update local storage
        await AsyncStorage.setItem(`shopez_cart_${userId}`, JSON.stringify(updatedCart));
        
        return updatedCart;
      }
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      throw error;
    }
  },

  async removeFromCart(userId, itemId) {
    try {
      const cartRef = ref(database, `carts/${userId}`);
      const existingCart = await this.getCartItems(userId);
      const updatedCart = existingCart.filter(item => item.id !== itemId);
      
      // Update Firebase Realtime Database
      await set(cartRef, updatedCart);
      
      // Also update local storage
      await AsyncStorage.setItem(`shopez_cart_${userId}`, JSON.stringify(updatedCart));
      
      return updatedCart;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  async clearCart(userId) {
    try {
      const cartRef = ref(database, `carts/${userId}`);
      
      // Clear Firebase Realtime Database
      await set(cartRef, []);
      
      // Also clear local storage
      await AsyncStorage.removeItem(`shopez_cart_${userId}`);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },

  // General storage operations
  async setItem(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error storing data:', error);
      throw error;
    }
  },

  async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  },

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
      throw error;
    }
  }
};