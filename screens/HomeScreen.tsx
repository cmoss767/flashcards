import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

const TOPICS = [
  { id: 'csharp', name: 'C#', file: 'csharp.json' },
  { id: 'javascript', name: 'JavaScript', file: 'javascript.json' },
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
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    maxWidth: 300,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  topicButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HomeScreen; 