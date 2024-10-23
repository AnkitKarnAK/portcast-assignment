import { SortingState, Updater } from '@tanstack/react-table';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TableState {
  favorites: string[];
  sorting: SortingState;
  toggleFavorite: (symbol: string) => void;
  setSorting: (updaterOrValue: Updater<SortingState>) => void;
}

export const useTableStore = create(
  persist<TableState>(
    (set) => ({
      favorites: [],
      sorting: [],
      toggleFavorite: (symbol) =>
        set((state) => {
          const updatedFavorites = state.favorites.includes(symbol)
            ? state.favorites.filter((item) => item !== symbol)
            : [...state.favorites, symbol];
          return { favorites: updatedFavorites };
        }),
      setSorting: (updaterOrValue: Updater<SortingState>) =>
        set((state) => {
          const newSorting =
            typeof updaterOrValue === 'function'
              ? updaterOrValue(state.sorting)
              : updaterOrValue;
          return { sorting: newSorting };
        }),
    }),
    {
      name: 'table-storage',
    }
  )
);
