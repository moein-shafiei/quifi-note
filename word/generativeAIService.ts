// filepath: word/generativeAIService.ts
import { Word } from '@/Intermediate/Word';
import Constants from 'expo-constants';

function getOpenAIApiKeyFromConstants(): string | undefined {
    // Support both classic and new Expo manifest types
    const manifest = Constants.manifest as any;
    if (manifest?.extra?.openaiApiKey) return manifest.extra.openaiApiKey;
    if (Constants.expoConfig?.extra?.openaiApiKey) return Constants.expoConfig.extra.openaiApiKey;
    return undefined;
}

// 1. Interface for generative AI services
export interface IGenerativeAIService {
    generatePicture(prompt: string): Promise<string>; // returns image URL or base64
    generateDefinition(word: string): Promise<string>;
    generateExample(word: string): Promise<string>;
    generateAudio(text: string): Promise<string>; // returns audio URL or base64
}

// 2. Example strategies
export class OpenAIGenerativeService implements IGenerativeAIService {
    private apiKey: string;
    constructor(apiKey?: string) {
        // Try to get the key from constructor, then from app.json extra, then from process.env
        this.apiKey = apiKey || getOpenAIApiKeyFromConstants() || process.env.OPENAI_API_KEY || '';
    }

    async generatePicture(prompt: string): Promise<string> {
        // DALL·E 3 image generation
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                },
            body: JSON.stringify({
                model: 'dall-e-3',
                prompt,
                n: 1,
                size: '512x512',
            }),
        });
        const data = await response.json();
        return data.data?.[0]?.url || '';
    }

    async generateDefinition(word: string): Promise<string> {
        // GPT-3.5/4 text generation for definition
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a dictionary assistant.' },
                    { role: 'user', content: `Give a concise dictionary definition for the word: "${word}".` },
                ],
                max_tokens: 60,
            }),
        });
        const data = await response.json();
        return data.choices?.[0]?.message?.content?.trim() || '';
    }

    async generateExample(word: string): Promise<string> {
        // GPT-3.5/4 text generation for example sentence
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a dictionary assistant.' },
                    { role: 'user', content: `Give a short example sentence using the word: "${word}".` },
                ],
                max_tokens: 60,
            }),
        });
        const data = await response.json();
        return data.choices?.[0]?.message?.content?.trim() || '';
    }

    async generateAudio(text: string): Promise<string> {
        // OpenAI TTS (text-to-speech) API
        const response = await fetch('https://api.openai.com/v1/audio/speech', {
            method: 'POST',
            headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                },
            body: JSON.stringify({
                model: 'tts-1',
                input: text,
                voice: 'alloy',
                response_format: 'url',
            }),
        });
        const data = await response.json();
        return data.url || '';
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
