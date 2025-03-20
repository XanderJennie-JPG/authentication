import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Helper function to safely use sessionStorage (only available in browser)
const saveToStorage = (key: string, value: string) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.sessionStorage) {
    window.sessionStorage.setItem(key, value);
  }
};

export default function SignupScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleNext = () => {
    if (!username.trim() || !password.trim()) {
      alert('Username and password are required');
      return;
    }
    
    // Store credentials in sessionStorage
    saveToStorage('auth_username', username);
    saveToStorage('auth_password', password);
    
    // Navigate to pin screen
    router.push('signup-pin');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Create Account</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.inputContainer}>
        <ThemedText>username</ThemedText>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder=""
          placeholderTextColor="#666"
        />
      </ThemedView>
      
      <ThemedView style={styles.inputContainer}>
        <ThemedText>password</ThemedText>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder=""
          placeholderTextColor="#666"
        />
      </ThemedView>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleNext}
      >
        <ThemedText style={styles.buttonText}>Next</ThemedText>
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
    marginBottom: 50,
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