// Import AsyncStorage from the async-storage package for data persistence
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Set an item in AsyncStorage.
 *
 * @param {string} key - The key under which the value is stored.
 * @param {any} value - The value to store, which will be stringified.
 */
export const setItem = async (key: string, value: any) => {
  try {
    // Convert the value to a JSON string and store it under the specified key
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Log any errors encountered during the operation
    console.error('Error setting item:', error);
  }
};

/**
 * Get an item from AsyncStorage.
 *
 * @param {string} key - The key of the item to retrieve.
 * @returns {Promise<any | null>} - The parsed value if found, or null if not found.
 */
export const getItem = async (key: string): Promise<any | null> => {
  try {
    // Retrieve the item as a string from AsyncStorage
    const value = await AsyncStorage.getItem(key);
    // Parse the string to JSON if it exists, otherwise return null
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    // Log any errors encountered during the operation
    console.error('Error getting item:', error);
    return null; // Return null in case of error
  }
};

/**
 * Remove an item from AsyncStorage.
 *
 * @param {string} key - The key of the item to remove.
 */
export const removeItem = async (key: string) => {
  try {
    // Remove the item associated with the specified key
    await AsyncStorage.removeItem(key);
  } catch (error) {
    // Log any errors encountered during the operation
    console.error('Error removing item:', error);
  }
};

/**
 * Clear all items from AsyncStorage.
 */
export const clear = async () => {
  try {
    // Clear all stored items in AsyncStorage
    await AsyncStorage.clear();
  } catch (error) {
    // Log any errors encountered during the operation
    console.error('Error clearing AsyncStorage:', error);
  }
};
