import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App'; // We will define this in App.tsx

// Define the topics - in a real app, you might fetch this list or scan the data/topics directory
const TOPICS = [
  { id: 'csharp', name: 'C#', file: 'csharp.json' },
  { id: 'javascript', name: 'JavaScript', file: 'javascript.json' },
  // Add more topics here as you create their JSON files
];

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const renderTopic = ({ item }: { item: typeof TOPICS[0] }) => (
    <TouchableOpacity
      style={styles.topicButton}
      onPress={() => navigation.navigate('Quiz', { topicId: item.id, topicName: item.name, topicFile: item.file })}
    >
      <Text style={styles.topicButtonText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose a Topic</Text>
      <FlatList
        data={TOPICS}
        renderItem={renderTopic}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  listContainer: {
    width: '100%',
    alignItems: 'center',
  },
  topicButton: {
    backgroundColor: '#007bff',
    paddingVertical: 18, // Increased padding
    paddingHorizontal: 30, // Increased padding
    borderRadius: 10, // Smoother corners
    marginVertical: 10,
    width: '80%',
    maxWidth: 300, // Max width for buttons
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  topicButtonText: {
    color: '#fff',
    fontSize: 18, // Increased font size
    fontWeight: '600',
  },
});

export default HomeScreen; 