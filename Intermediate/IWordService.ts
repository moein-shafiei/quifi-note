import { Word } from './Word';

export interface IWordService {
  getAll(): Promise<Word[]>;
  getById(id: string): Promise<Word | undefined>;
  create(word: Word): Promise<void>;
  update(id: string, updated: Partial<Word>): Promise<void>;
  delete(id: string): Promise<void>;
}
