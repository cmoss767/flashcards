import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, StatusBar, ActivityIndicator } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App'; // We will define this in App.tsx

interface QuizItem {
  id: number;
  question: string;
  answer: string;
}

type QuizScreenRouteProp = RouteProp<RootStackParamList, 'Quiz'>;
type QuizScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Quiz'>;

type Props = {
  route: QuizScreenRouteProp;
  navigation: QuizScreenNavigationProp;
};

const QuizScreen: React.FC<Props> = ({ route, navigation }) => {
  const { topicId, topicName, topicFile } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [questions, setQuestions] = useState<QuizItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Dynamically import the JSON file for the topic
        // Note: Metro bundler needs to be able to statically analyze this import.
        // More complex dynamic paths might require a different approach (e.g., a helper function or a map).
        let topicData;
        if (topicFile === 'csharp.json') {
          topicData = require('../data/topics/csharp.json');
        } else if (topicFile === 'javascript.json') {
          topicData = require('../data/topics/javascript.json');
        }
        // Add more else if blocks here for other topics
        else {
          throw new Error(`Unknown topic file: ${topicFile}`);
        }
        
        setQuestions(shuffleArray([...topicData]));
      } catch (e) {
        console.error("Failed to load quiz data:", e);
        setError(`Failed to load questions for ${topicName}. Please try again.`);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
    // Set the title of the screen to the topic name
    navigation.setOptions({ title: `${topicName} Quiz` });

  }, [topicId, topicName, topicFile, navigation]);

  const shuffleArray = (array: QuizItem[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleNextQuestion = () => {
    setShowAnswer(false);
    if (questions.length > 0) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
    }
  };

  const handleFlipCard = () => {
    setShowAnswer(!showAnswer);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.containerCentered}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading {topicName} questions...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.containerCentered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back to Topics</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.containerCentered}>
        <Text style={styles.errorText}>No questions found for {topicName}.</Text>
         <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back to Topics</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.questionNumber}>
          Question {currentIndex + 1} of {questions.length}
        </Text>
        <View style={styles.cardContent}>
          <Text style={styles.text}>
            {showAnswer ? currentQuestion.answer : currentQuestion.question}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.flipButton]} onPress={handleFlipCard}>
          <Text style={styles.buttonText}>{showAnswer ? 'Show Question' : 'Show Answer'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={handleNextQuestion}>
          <Text style={styles.buttonText}>Next Question</Text>
        </TouchableOpacity>
      </View>
      <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'space-around', // Adjusted for better spacing
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 20,
    paddingBottom: 20, // Added padding at the bottom
  },
  containerCentered: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15, // Slightly more rounded corners
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Increased shadow offset
    shadowOpacity: 0.15, // Subtler shadow
    shadowRadius: 6, // Softer shadow
    elevation: 8,
    width: '100%',
    maxWidth: 450, // Slightly larger max width
    minHeight: 250, // Slightly taller card
    justifyContent: 'space-between',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22, // Kept font size
    textAlign: 'center',
    color: '#333',
    paddingHorizontal: 5, // Ensure text does not touch edges
  },
  questionNumber: {
    fontSize: 16,
    color: '#555', // Slightly darker gray
    textAlign: 'left',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20, // Adjusted margin
    justifyContent: 'space-between', // Use space-between for full width usage
    width: '100%',
    maxWidth: 450,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5, // Reduced margin as space-between is used
    alignItems: 'center',
    flexGrow: 1, // Allow buttons to grow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  flipButton: {
    backgroundColor: '#28a745', // Green for flip/show answer
  },
  nextButton: {
    backgroundColor: '#007bff', // Blue for next
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  }
});

export default QuizScreen; 