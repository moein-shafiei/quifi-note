import { View, Text, Image, StyleSheet, Button, Alert, TextInput } from 'react-native';
import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import { Word } from '@/Intermediate/Word';
import { WordService } from '@/word/wordService';
import { Picker } from '@react-native-picker/picker';
import { Category } from '@/Intermediate/Category';
import { CategoryService } from '@/word/categoryService';
import uuid from 'react-native-uuid';

export default function WordView() {
    const [word, setWord] = useState<Word | null>(null);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [name, setName] = useState('');
    const [picture, setPicture] = useState('');
    const [definition, setDefinition] = useState('');
    const [audio, setAudio] = useState('');
    const [example, setExample] = useState('');
    const [audioExample, setAudioExample] = useState('');

    useEffect(() => {
        WordService.getById('1').then((w: Word | undefined) => setWord(w ?? null));
        CategoryService.getAll().then(setCategories);
    }, []);

    async function playAudio(uri: string) {
        if (!uri) return;
        const { sound } = await Audio.Sound.createAsync({ uri });
        setSound(sound);
        await sound.playAsync();
    }

    function emptyFields() {
        setName('');
        setPicture('');
        setDefinition('');
        setAudio('');
        setExample('');
        setAudioExample('');
        setSelectedCategory('');
    }

    async function saveWord() {
        if (!name.trim() || !selectedCategory) {
            Alert.alert('Validation', 'Name and Category are required.');
            return;
        }
        const newWord: Word = {
            id: uuid.v4().toString(),
            name,
            picture,
            definition,
            audio,
            example,
            audioExample,
        };
        await WordService.create(newWord);
        Alert.alert('Success', 'Word saved!');
        emptyFields();
    }

    if (!word) return <View style={styles.container}><Text>Loading...</Text></View>;

    // If any field is filled, use the input UI, otherwise show the loaded word
    const isEditing = name || picture || definition || audio || example || audioExample || selectedCategory;

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectedCategory}
                style={{ height: 50, width: 200 }}
                onValueChange={(itemValue: string) => setSelectedCategory(itemValue)}
            >
                <Picker.Item label="Select Category" value="" />
                {categories.map((cat) => (
                    <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
                ))}
            </Picker>
            {isEditing ? (
                <>
                    <Text>Name:</Text>
                    <TextInput value={name} onChangeText={setName} style={styles.input} />
                    <Text>Picture URL:</Text>
                    <TextInput value={picture} onChangeText={setPicture} style={styles.input} />
                    <Text>Definition:</Text>
                    <TextInput value={definition} onChangeText={setDefinition} style={styles.input} />
                    <Text>Audio URL:</Text>
                    <TextInput value={audio} onChangeText={setAudio} style={styles.input} />
                    <Text>Example:</Text>
                    <TextInput value={example} onChangeText={setExample} style={styles.input} />
                    <Text>Audio Example URL:</Text>
                    <TextInput value={audioExample} onChangeText={setAudioExample} style={styles.input} />
                </>
            ) : (
                <>
                    <Text style={styles.title}>{word.name}</Text>
                    <Image source={{ uri: word.picture }} style={styles.image} />
                    <Text style={styles.definition}>{word.definition}</Text>
                    <Text style={styles.example}>{word.example}</Text>
                </>
            )}
            <Button title="Empty" onPress={emptyFields} />
            <Button title="Save" onPress={saveWord} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
    image: { width: 150, height: 150, marginBottom: 12, resizeMode: 'contain' },
    definition: { fontSize: 16, marginBottom: 8 },
    example: { fontSize: 16, fontStyle: 'italic', marginBottom: 8 },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, width: '100%', paddingHorizontal: 8 },
});
