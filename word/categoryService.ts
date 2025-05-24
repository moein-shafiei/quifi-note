import { Category } from '@/Intermediate/Category';
import { Word } from '@/Intermediate/Word';

// Dummy categories for demonstration
const categories: Category[] = [
  {
    id: '1',
    name: 'French',
    words: [],
  },
  {
    id: '2',
    name: 'English',
    words: [],
  },
];

export const CategoryService = {
  getAll: async (): Promise<Category[]> => {
    // Replace with real API or storage logic
    return categories;
  },
};
