import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Platform, TextInput, Button, Text, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ExternalLink } from '@/components/ExternalLink';

export default function TabTwoScreen() {
  const [idea, setIdea] = useState('');
  const [ideas, setIdeas] = useState<string[]>([]);

  const addIdea = () => {
    if (idea.trim()) {
      setIdeas([...ideas, idea]);
      setIdea('');
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">How to Develop Using Expo</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Install Expo CLI</ThemedText>
        <ThemedText>
          Open your terminal and run{' '}
          <ThemedText type="defaultSemiBold">npm install -g expo-cli</ThemedText> to install Expo CLI
          globally.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Create a New Project</ThemedText>
        <ThemedText>
          Run <ThemedText type="defaultSemiBold">expo init my-new-project</ThemedText> and choose a
          template. Navigate into your project directory with{' '}
          <ThemedText type="defaultSemiBold">cd my-new-project</ThemedText>.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Start the Development Server</ThemedText>
        <ThemedText>
          Start the development server with{' '}
          <ThemedText type="defaultSemiBold">expo start</ThemedText>. This will open the Expo
          Developer Tools in your browser.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 4: Open Your App on Your Device</ThemedText>
        <ThemedText>
          Download the Expo Go app from the App Store or Google Play. Scan the QR code using Expo Go
          to open your project.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 5: Edit Your Code</ThemedText>
        <ThemedText>
          Open your project in your favorite text editor, and start editing{' '}
          <ThemedText type="defaultSemiBold">App.js</ThemedText> to see your changes instantly!
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Learn More</ThemedText>
        <ExternalLink href="https://docs.expo.dev/get-started/installation/">
          <ThemedText type="link">Expo Documentation</ThemedText>
        </ExternalLink>
      </ThemedView>

      <ThemedView style={styles.shareContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write your recommendation..."
          value={idea}
          onChangeText={setIdea}
        />
        <Button title="Share Your Idea" onPress={addIdea} />
      </ThemedView>

      <ThemedView style={styles.notesContainer}>
        {ideas.length > 0 && <Text style={styles.notesTitle}>Shared Ideas</Text>}
        {ideas.map((i, index) => (
          <Text key={index} style={styles.note}>
            {index + 1}. {i}
          </Text>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    padding: 16,
  },
  stepContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  shareContainer: {
    padding: 16,
    marginVertical: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    marginBottom: 8,
  },
  notesContainer: {
    padding: 16,
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
});
