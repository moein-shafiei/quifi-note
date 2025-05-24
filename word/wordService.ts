import { IWordService } from '@/Intermediate/IWordService';
import { Word } from '@/Intermediate/Word';
import { WordFirebaseService } from './wordFirebaseService';

export const WordService: IWordService = {
  getAll: async (): Promise<Word[]> => {
    return WordFirebaseService.getAll();
  },
  getById: async (id: string): Promise<Word | undefined> => {
    return WordFirebaseService.getById(id);
  },
  create: async (word: Word): Promise<void> => {
    await WordFirebaseService.create(word);
  },
  update: async (id: string, updated: Partial<Word>): Promise<void> => {
    await WordFirebaseService.update(id, updated);
  },
  delete: async (id: string): Promise<void> => {
    await WordFirebaseService.delete(id);
  },
};
