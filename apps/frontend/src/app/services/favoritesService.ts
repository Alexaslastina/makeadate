export interface FavoriteItem {
  id: string;
  title: string;
  image: string;
  price: string;
  duration: string;
  rating: number;
}

const FAVORITES_STORAGE_KEY = 'makeadate_favorites';

export function getFavorites(): FavoriteItem[] {
  try {
    const favoritesJson = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error("Failed to parse favorites from localStorage", error);
    return [];
  }
}

export function addFavorite(item: FavoriteItem): void {
  const favorites = getFavorites();
  if (!favorites.some(fav => fav.id === item.id)) {
    favorites.push(item);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    window.dispatchEvent(new Event('favoritesUpdated')); // Notify UI
  }
}

export function removeFavorite(itemId: string): void {
  let favorites = getFavorites();
  favorites = favorites.filter(fav => fav.id !== itemId);
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  window.dispatchEvent(new Event('favoritesUpdated')); // Notify UI
}

export function isFavorite(itemId: string): boolean {
  const favorites = getFavorites();
  return favorites.some(fav => fav.id === itemId);
}

// Legacy aliases for backward compatibility
export function addToFavorites(item: FavoriteItem): void {
  addFavorite(item);
}

export function removeFromFavorites(itemId: string): void {
  removeFavorite(itemId);
}

export function toggleFavorite(item: FavoriteItem): boolean {
  if (isFavorite(item.id)) {
    removeFavorite(item.id);
    return false;
  } else {
    addFavorite(item);
    return true;
  }
}

export function clearFavorites(): void {
  localStorage.removeItem(FAVORITES_STORAGE_KEY);
  window.dispatchEvent(new Event('favoritesUpdated'));
}

// Type alias for backward compatibility
export type DateItem = FavoriteItem;

