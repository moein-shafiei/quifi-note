// filepath: word/generativeAIService.ts
import { Word } from '@/Intermediate/Word';

// 1. Interface for generative AI services
export interface IGenerativeAIService {
    generatePicture(prompt: string): Promise<string>; // returns image URL or base64
    generateDefinition(word: string): Promise<string>;
    generateExample(word: string): Promise<string>;
    generateAudio(text: string): Promise<string>; // returns audio URL or base64
}

// 2. Example strategies
export class OpenAIGenerativeService implements IGenerativeAIService {
    async generatePicture(prompt: string): Promise<string> {
        // Implement OpenAI image generation API call
        return 'openai-image-url';
    }
    async generateDefinition(word: string): Promise<string> {
        // Implement OpenAI text generation API call
        return 'openai-definition';
    }
    async generateExample(word: string): Promise<string> {
        // Implement OpenAI text generation API call
        return 'openai-example';
    }
    async generateAudio(text: string): Promise<string> {
        // Implement OpenAI audio generation API call
        return 'openai-audio-url';
    }
}

export class AnthropicGenerativeService implements IGenerativeAIService {
    async generatePicture(prompt: string): Promise<string> {
        return 'anthropic-image-url';
    }
    async generateDefinition(word: string): Promise<string> {
        return 'anthropic-definition';
    }
    async generateExample(word: string): Promise<string> {
        return 'anthropic-example';
    }
    async generateAudio(text: string): Promise<string> {
        return 'anthropic-audio-url';
    }
}

export class OpenSeekGenerativeService implements IGenerativeAIService {
    async generatePicture(prompt: string): Promise<string> {
        return 'openseek-image-url';
    }
    async generateDefinition(word: string): Promise<string> {
        return 'openseek-definition';
    }
    async generateExample(word: string): Promise<string> {
        return 'openseek-example';
    }
    async generateAudio(text: string): Promise<string> {
        return 'openseek-audio-url';
    }
}

// 3. Context class using the strategy pattern
export class GenerativeAIService implements IGenerativeAIService {
    private strategy: IGenerativeAIService;
    constructor(strategy: IGenerativeAIService) {
        this.strategy = strategy;
    }
    setStrategy(strategy: IGenerativeAIService) {
        this.strategy = strategy;
    }
    generatePicture(prompt: string): Promise<string> {
        return this.strategy.generatePicture(prompt);
    }
    generateDefinition(word: string): Promise<string> {
        return this.strategy.generateDefinition(word);
    }
    generateExample(word: string): Promise<string> {
        return this.strategy.generateExample(word);
    }
    generateAudio(text: string): Promise<string> {
        return this.strategy.generateAudio(text);
    }
}
