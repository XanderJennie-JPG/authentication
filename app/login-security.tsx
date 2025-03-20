import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function LoginSecurityScreen() {
  const router = useRouter();
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Get the security question from sessionStorage
    const question = sessionStorage.getItem('auth_security_question');
    if (question) {
      setSecurityQuestion(question);
    }
  }, []);
  
  const handleVerify = () => {
    if (!answer.trim()) {
      setError('Answer is required');
      return;
    }
    
    // Check answer against sessionStorage
    const storedAnswer = sessionStorage.getItem('auth_security_answer');
    
    if (answer.toLowerCase().trim() === storedAnswer?.toLowerCase().trim()) {
      // Successful login!
      router.push('/login-success');
    } else {
      setError('Incorrect answer');
      setAnswer('');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Security Question</ThemedText>
      </ThemedView>
      
      {error ? (
        <ThemedView style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        </ThemedView>
      ) : null}
      
      <ThemedView style={styles.questionContainer}>
        <ThemedText>answer your security question.</ThemedText>
        <ThemedView style={styles.questionBox}>
          <ThemedText style={styles.questionText}>{securityQuestion}</ThemedText>
        </ThemedView>
      </ThemedView>
      
      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={answer}
          onChangeText={(text) => {
            setAnswer(text);
            setError('');
          }}
          placeholder=""
          placeholderTextColor="#666"
        />
      </ThemedView>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleVerify}
      >
        <ThemedText style={styles.buttonText}>Verify</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titleContainer: {
    marginBottom: 30,
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  questionContainer: {
    width: '100%',
    marginBottom: 20,
  },
  questionBox: {
    padding: 15,
    backgroundColor: 'rgba(78, 93, 225, 0.1)',
    borderRadius: 8,
    marginTop: 10,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#4E5DE1',
    borderRadius: 8,
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