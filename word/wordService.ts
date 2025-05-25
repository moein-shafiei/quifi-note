import { IWordService } from '@/Intermediate/IWordService';
import { Word } from '@/Intermediate/Word';
import { WordFirebaseService } from './wordFirebaseService';
import { GenerativeAIService, OpenAIGenerativeService } from './generativeAIService';

const generativeAI = new GenerativeAIService(new OpenAIGenerativeService());

export const WordService: IWordService = {
  getAll: async (): Promise<Word[]> => {
    return WordFirebaseService.getAll();
  },
  getById: async (id: string): Promise<Word | undefined> => {
    return WordFirebaseService.getById(id);
  },
  create: async (word: Word): Promise<void> => {
    // Generate missing fields using generative AI
    const generatedWord = { ...word };
    if (!generatedWord.definition) {
      generatedWord.definition = await generativeAI.generateDefinition(generatedWord.name);
    }
    if (!generatedWord.picture) {
      generatedWord.picture = await generativeAI.generatePicture(generatedWord.name);
    }
    if (!generatedWord.example) {
      generatedWord.example = await generativeAI.generateExample(generatedWord.name);
    }
    if (!generatedWord.audio) {
      generatedWord.audio = await generativeAI.generateAudio(generatedWord.name);
    }
    await WordFirebaseService.create(generatedWord);
  },
  update: async (id: string, updated: Partial<Word>): Promise<void> => {
    await WordFirebaseService.update(id, updated);
  },
  delete: async (id: string): Promise<void> => {
    await WordFirebaseService.delete(id);
  },
};
