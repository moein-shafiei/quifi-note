export interface Word {
    id: string;
    name: string;
    picture: string; // URL or local path to image
    definition: string;
    audio: string; // URL or local path to audio file
    example: string;
    audioExample: string; // URL or local path to audio file for example
}
