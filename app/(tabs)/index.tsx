import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';

export default function IndexScreen() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [noteIndex, setNoteIndex] = useState<number | null>(null);

  const addNote = () => {
    if (note.trim()) {
      if (isEditing && noteIndex !== null) {
        const updatedNotes = [...notes];
        updatedNotes[noteIndex] = note;
        setNotes(updatedNotes);
        setIsEditing(false);
        setNoteIndex(null);
      } else {
        setNotes([...notes, note]);
      }
      setNote('');
    }
  };

  const deleteNote = (index: number) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            const updatedNotes = notes.filter((_, i) => i !== index);
            setNotes(updatedNotes);
          },
          style: "destructive"
        }
      ]
    );
  };

  const editNote = (index: number) => {
    setNoteIndex(index);
    setNote(notes[index]);
    setIsEditing(true);
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
          <TouchableOpacity style={styles.button} onPress={addNote}>
            <Text style={styles.buttonText}>{isEditing ? "Update Note" : "Add Note"}</Text>
          </TouchableOpacity>
        </ThemedView>
        <ThemedView style={styles.notesContainer}>
          {notes.length > 0 && <Text style={styles.notesTitle}>Notes</Text>}
          {notes.map((n, index) => (
            <View key={index} style={styles.noteContainer}>
              <Text style={styles.note}>
                {index + 1}. {n}
              </Text>
              <TouchableOpacity style={styles.editButton} onPress={() => editNote(index)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteNote(index)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#6200ea',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  editButton: {
    backgroundColor: '#0074d9',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: '#ff4136',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  notesContainer: {
    marginTop: 16,
  },
  notesTitle: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
  },
  note: {
    flex: 1,
    fontSize: 16,
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
    paddingHorizontal: 16,
  },
});