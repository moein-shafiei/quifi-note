import { IWordService } from '@/Intermediate/IWordService';
import { Word } from '@/Intermediate/Word';

// In-memory mock data for demonstration
let words: Word[] = [
  {
    id: '1',
    name: 'Example',
    picture: 'https://png.pngtree.com/png-vector/20221217/ourmid/pngtree-example-sample-grungy-stamp-vector-png-image_15560590.png',
    definition: 'This is an example definition.',
    audio: '',
    example: 'This is an example sentence.',
    audioExample: '',
  },
];

export const WordService: IWordService = {
  getAll: async (): Promise<Word[]> => {
    return words;
  },
  getById: async (id: string): Promise<Word | undefined> => {
    return words.find(w => w.id === id);
  },
  create: async (word: Word): Promise<void> => {
    words.push(word);
  },
  update: async (id: string, updated: Partial<Word>): Promise<void> => {
    words = words.map(w => (w.id === id ? { ...w, ...updated } : w));
  },
  delete: async (id: string): Promise<void> => {
    words = words.filter(w => w.id !== id);
  },
};
