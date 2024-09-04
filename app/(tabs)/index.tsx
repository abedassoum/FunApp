import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View, ScrollView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';

export default function IndexScreen() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<string[]>([]);

  const addNote = () => {
    if (note.trim()) {
      setNotes([...notes, note]);
      setNote('');
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Take Notes</ThemedText>
      </ThemedView>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedView style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter a note..."
            value={note}
            onChangeText={setNote}
          />
          <Button title="Add Note" onPress={addNote} />
        </ThemedView>
        <ThemedView style={styles.notesContainer}>
          {notes.length > 0 && <Text style={styles.notesTitle}>Notes</Text>}
          {notes.map((n, index) => (
            <Text key={index} style={styles.note}>
              {index + 1}. {n}
            </Text>
          ))}
        </ThemedView>
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    marginRight: 8,
  },
  notesContainer: {
    marginTop: 16,
  },
  notesTitle: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 16,
    marginBottom: 4,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});