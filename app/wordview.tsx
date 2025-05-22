import { View, Text, Image, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { useState } from 'react';
import { Word } from '../Intermediate/Word';

// Example word data (replace with real data or props)
const exampleWord: Word = {
    id: '1',
    name: 'Example',
    picture: 'https://png.pngtree.com/png-vector/20221217/ourmid/pngtree-example-sample-grungy-stamp-vector-png-image_15560590.png',
    definition: 'This is an example definition.',
    audio: '',
    example: 'This is an example sentence.',
    audioExample: '',
};

export default function WordView() {
    const [sound, setSound] = useState<Audio.Sound | null>(null);

    async function playAudio(uri: string) {
        if (!uri) return;
        const { sound } = await Audio.Sound.createAsync({ uri });
        setSound(sound);
        await sound.playAsync();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{exampleWord.name}</Text>
            <Image source={{ uri: exampleWord.picture }} style={styles.image} />
            <Text style={styles.definition}>{exampleWord.definition}</Text>
            <Text style={styles.example}>{exampleWord.example}</Text>
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
