import { Word } from '@/Intermediate/Word';
import { firestore } from './firebaseConfig';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  DocumentData,
} from 'firebase/firestore';


export interface IWordFirebaseService {
  getAll(): Promise<Word[]>;
  getById(id: string): Promise<Word | undefined>;
  create(word: Word): Promise<void>;
  update(id: string, updated: Partial<Word>): Promise<void>;
  delete(id: string): Promise<void>;
}

export const WordFirebaseService: IWordFirebaseService = {
  async getAll() {
    const colRef = collection(firestore, 'words');
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() as DocumentData })) as Word[];
  },
  async getById(id: string) {
    const docRef = doc(firestore, 'words', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() as DocumentData } as Word) : undefined;
  },
  async create(word: Word) {
    const docRef = doc(firestore, 'words', word.id);
    await setDoc(docRef, word);
  },
  async update(id: string, updated: Partial<Word>) {
    const docRef = doc(firestore, 'words', id);
    await updateDoc(docRef, updated);
  },
  async delete(id: string) {
    const docRef = doc(firestore, 'words', id);
    await deleteDoc(docRef);
  },
};
