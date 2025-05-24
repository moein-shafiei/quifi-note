import { Word } from "./Word";

export interface Category {
    id: string;
    name: string;
    description?: string;
    words: Word[];
}
