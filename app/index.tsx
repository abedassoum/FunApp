import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Text
} from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState<string[]>([]);
  const navigation = useNavigation();

  const addNote = () => {
    if (text.trim()) {
      setNotes([...notes, text]);
      setText("");
    }
  };

  const openDetailPage = (note: string) => {
    navigation.navigate('DetailPage', { note });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a note"
        value={text}
        onChangeText={setText}
      />
      <Button title="Add Note" onPress={addNote} />
      <ScrollView style={styles.notesContainer}>
        {notes.map((note, index) => (
          <TouchableOpacity
            key={index}
            style={styles.noteButton}
            onPress={() => openDetailPage(note)}
          >
            <Text style={styles.noteText}>
              {note.length > 30 ? `${note.slice(0, 30)}...` : note}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: "100%",
  },
  notesContainer: {
    marginTop: 20,
    width: "100%",
  },
  noteButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 5,
  },
  noteText: {
    fontSize: 16,
  },
});