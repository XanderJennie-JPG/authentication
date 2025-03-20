import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Platform, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Helper function to safely use sessionStorage (only available in browser)
const getFromStorage = (key: string) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.sessionStorage) {
    return window.sessionStorage.getItem(key);
  }
  return null;
};

export default function LoginSecurityScreen() {
  const router = useRouter();
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  
  // Get the stored security question
  const securityQuestion = getFromStorage('auth_security_question') || 'What was your first pet\'s name?';
  
  const handleVerify = () => {
    if (!answer.trim()) {
      setError('Answer is required');
      return;
    }
    
    // Check answer against sessionStorage
    const storedAnswer = getFromStorage('auth_security_answer');
    
    if (answer.toLowerCase() === storedAnswer?.toLowerCase()) {
      // Authentication complete, go to success page
      router.push('/login-success');
    } else {
      setError('Incorrect answer');
      setAnswer('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.headerGroup}>
          <ThemedText style={styles.headerText}>security verification</ThemedText>
        </View>
        
        {error ? (
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          </View>
        ) : null}
        
        <View style={styles.questionGroup}>
          <ThemedText style={styles.inputLabel}>your security question:</ThemedText>
          <ThemedText style={styles.questionText}>{securityQuestion}</ThemedText>
        </View>
        
        <View style={styles.inputGroup}>
          <ThemedText style={styles.inputLabel}>your answer:</ThemedText>
          <TextInput
            style={styles.input}
            value={answer}
            onChangeText={(text) => {
              setAnswer(text);
              setError('');
            }}
            placeholder=""
            placeholderTextColor="#666"
            selectionColor="#85a8ff"
          />
        </View>
        
        <TouchableOpacity 
          style={styles.cursorButton} 
          onPress={handleVerify}
        >
          <View style={styles.cursor}></View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f1117',
    padding: 20,
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
  headerText: {
    color: '#85a8ff',
    fontSize: 24,
    fontFamily: 'monospace',
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 50, 50, 0.1)',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2a3c5d',
  },
  errorText: {
    color: '#ff8585',
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  questionGroup: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#2a3c5d',
    padding: 20,
  },
  questionText: {
    color: '#85a8ff',
    fontSize: 18,
    fontFamily: 'monospace',
    marginTop: 10,
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