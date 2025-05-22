import { View, Text, Image, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import { Word } from '@/Intermediate/Word';
import { WordService } from '@/word/wordService';

export default function WordView() {
    const [word, setWord] = useState<Word | null>(null);
    const [sound, setSound] = useState<Audio.Sound | null>(null);

    useEffect(() => {
        WordService.getById('1').then((w: Word | undefined) => setWord(w ?? null));
    }, []);

    async function playAudio(uri: string) {
        if (!uri) return;
        const { sound } = await Audio.Sound.createAsync({ uri });
        setSound(sound);
        await sound.playAsync();
    }

    if (!word) return <View style={styles.container}><Text>Loading...</Text></View>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{word.name}</Text>
            <Image source={{ uri: word.picture }} style={styles.image} />
            <Text style={styles.definition}>{word.definition}</Text>
            <Text style={styles.example}>{word.example}</Text>
            {/* Add buttons to play audio if URIs are provided */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
    image: { width: 150, height: 150, marginBottom: 12, resizeMode: 'contain' },
    definition: { fontSize: 16, marginBottom: 8 },
    example: { fontSize: 16, fontStyle: 'italic', marginBottom: 8 },
});
