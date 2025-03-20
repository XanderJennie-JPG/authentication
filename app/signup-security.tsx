import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
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
    sessionStorage.setItem('auth_security_question', selectedQuestion);
    sessionStorage.setItem('auth_security_answer', answer);
    
    // Complete signup
    router.push('/signup-success');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Security Question</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.questionContainer}>
          <ThemedText>select a security question:</ThemedText>
          <ThemedView style={styles.questionsWrapper}>
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
                  style={selectedQuestion === question ? styles.selectedQuestionText : {}}
                >
                  {question}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>
        
        <ThemedView style={styles.answerContainer}>
          <ThemedText>answer your security question.</ThemedText>
          <TextInput
            style={styles.input}
            value={answer}
            onChangeText={setAnswer}
            placeholder=""
            placeholderTextColor="#666"
          />
        </ThemedView>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleComplete}
        >
          <ThemedText style={styles.buttonText}>Complete Signup</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
  },
  titleContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  questionContainer: {
    width: '100%',
    marginBottom: 20,
  },
  questionsWrapper: {
    marginTop: 10,
  },
  questionOption: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedQuestion: {
    borderColor: '#4E5DE1',
    backgroundColor: 'rgba(78, 93, 225, 0.1)',
  },
  selectedQuestionText: {
    fontWeight: 'bold',
  },
  answerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#4E5DE1',
    borderRadius: 8,
    marginTop: 10,
    color: '#000',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4E5DE1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 