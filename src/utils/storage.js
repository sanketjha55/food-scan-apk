// Storage utilities for local data persistence

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  SELECTED_LANGUAGE: 'selectedLanguage',
  SELECTED_REGION: 'selectedRegion',
  USER_PREFERENCES: 'userPreferences',
  SCAN_HISTORY: 'scanHistory',
  FAVORITES: 'favorites',
  HEALTH_PROFILE: 'healthProfile',
  THEME_MODE: 'themeMode',
};

// Get stored value
export async function getStorageItem(key, defaultValue = null) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving ${key}:`, error);
    return defaultValue;
  }
}

// Set storage value
export async function setStorageItem(key, value) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error(`Error setting ${key}:`, error);
    return false;
  }
}

// Remove storage item
export async function removeStorageItem(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${key}:`, error);
    return false;
  }
}

// Clear all storage
export async function clearAllStorage() {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
}

// User Preferences
export async function getUserPreferences() {
  return getStorageItem(STORAGE_KEYS.USER_PREFERENCES, {});
}

export async function saveUserPreferences(preferences) {
  return setStorageItem(STORAGE_KEYS.USER_PREFERENCES, preferences);
}

// Scan History
export async function getScanHistory() {
  return getStorageItem(STORAGE_KEYS.SCAN_HISTORY, []);
}

export async function addToScanHistory(foodData) {
  try {
    const history = await getScanHistory();
    const newEntry = {
      ...foodData,
      scanTime: new Date().toISOString(),
      id: `scan_${Date.now()}`,
    };
    
    const updatedHistory = [newEntry, ...history].slice(0, 100); // Keep last 100
    await setStorageItem(STORAGE_KEYS.SCAN_HISTORY, updatedHistory);
    return true;
  } catch (error) {
    console.error('Error adding to history:', error);
    return false;
  }
}

export async function clearScanHistory() {
  return removeStorageItem(STORAGE_KEYS.SCAN_HISTORY);
}

// Favorites
export async function getFavorites() {
  return getStorageItem(STORAGE_KEYS.FAVORITES, []);
}

export async function addToFavorites(foodData) {
  try {
    const favorites = await getFavorites();
    if (!favorites.find(fav => fav.name === foodData.name)) {
      favorites.push({ ...foodData, addedAt: new Date().toISOString() });
      await setStorageItem(STORAGE_KEYS.FAVORITES, favorites);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return false;
  }
}

export async function removeFromFavorites(foodName) {
  try {
    const favorites = await getFavorites();
    const filtered = favorites.filter(fav => fav.name !== foodName);
    await setStorageItem(STORAGE_KEYS.FAVORITES, filtered);
    return true;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return false;
  }
}

// Health Profile
export async function getHealthProfile() {
  return getStorageItem(STORAGE_KEYS.HEALTH_PROFILE, null);
}

export async function saveHealthProfile(profile) {
  return setStorageItem(STORAGE_KEYS.HEALTH_PROFILE, profile);
}

// Theme Mode
export async function getThemeMode() {
  return getStorageItem(STORAGE_KEYS.THEME_MODE, 'light');
}

export async function setThemeMode(mode) {
  return setStorageItem(STORAGE_KEYS.THEME_MODE, mode);
}

export default {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
  clearAllStorage,
  getUserPreferences,
  saveUserPreferences,
  getScanHistory,
  addToScanHistory,
  clearScanHistory,
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  getHealthProfile,
  saveHealthProfile,
  getThemeMode,
  setThemeMode,
};
