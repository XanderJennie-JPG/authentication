import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const SECURITY_QUESTIONS = [
  "What was the name of your first pet?",
  "In what city were you born?",
  "What is your mother's maiden name?",
  "What high school did you attend?",
  "What was the make of your first car?",
  "What is your favorite movie?",
  "What is the name of your favorite childhood teacher?",
  "What is your favorite book?"
];

// Helper function to safely use sessionStorage (only available in browser)
const saveToStorage = (key: string, value: string) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.sessionStorage) {
    window.sessionStorage.setItem(key, value);
  }
};

export default function SignupSecurityScreen() {
  const router = useRouter();
  const [selectedQuestion, setSelectedQuestion] = useState(SECURITY_QUESTIONS[0]);
  const [answer, setAnswer] = useState('');
  
  const handleComplete = () => {
    if (!answer.trim()) {
      alert('Security answer is required');
      return;
    }
    
    // Store in sessionStorage
    saveToStorage('auth_security_question', selectedQuestion);
    saveToStorage('auth_security_answer', answer);
    
    // Complete signup
    router.push('/signup-success');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <View style={styles.headerGroup}>
            <ThemedText style={styles.inputLabel}>select a security question.</ThemedText>
          </View>
          
          <View style={styles.questionsContainer}>
            {SECURITY_QUESTIONS.map((question, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.questionOption,
                  selectedQuestion === question && styles.selectedQuestion
                ]}
                onPress={() => setSelectedQuestion(question)}
              >
                <ThemedText 
                  style={[
                    styles.questionText,
                    selectedQuestion === question && styles.selectedQuestionText
                  ]}
                >
                  {question}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>answer your security question.</ThemedText>
            <TextInput
              style={styles.input}
              value={answer}
              onChangeText={setAnswer}
              placeholder=""
              placeholderTextColor="#666"
              selectionColor="#85a8ff"
            />
          </View>
          
          <TouchableOpacity 
            style={styles.cursorButton} 
            onPress={handleComplete}
          >
            <View style={styles.cursor}></View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1117',
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#2a3c5d',
    borderRadius: 5,
    overflow: 'hidden',
  },
  headerGroup: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#2a3c5d',
    padding: 20,
  },
  questionsContainer: {
    width: '100%',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2a3c5d',
  },
  questionOption: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#2a3c5d',
    borderRadius: 5,
    marginBottom: 10,
  },
  questionText: {
    color: '#85a8ff',
    fontFamily: 'monospace',
  },
  selectedQuestion: {
    borderColor: '#85a8ff',
    backgroundColor: 'rgba(133, 168, 255, 0.1)',
  },
  selectedQuestionText: {
    fontWeight: 'bold',
  },
  inputGroup: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#2a3c5d',
    padding: 20,
  },
  inputLabel: {
    color: '#85a8ff',
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'monospace',
  },
  input: {
    width: '100%',
    color: '#85a8ff',
    fontSize: 24,
    fontFamily: 'monospace',
    padding: 0,
  },
  cursorButton: {
    alignItems: 'flex-end',
    padding: 20,
  },
  cursor: {
    width: 30,
    height: 5,
    backgroundColor: '#85a8ff',
  },
}); 