import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required');
      return;
    }
    
    // Check credentials against sessionStorage
    const storedUsername = sessionStorage.getItem('auth_username');
    const storedPassword = sessionStorage.getItem('auth_password');
    
    if (username === storedUsername && password === storedPassword) {
      // Move to PIN verification
      router.push('/login-pin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Login</ThemedText>
      </ThemedView>
      
      {error ? (
        <ThemedView style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        </ThemedView>
      ) : null}
      
      <ThemedView style={styles.inputContainer}>
        <ThemedText>username</ThemedText>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setError('');
          }}
          placeholder=""
          placeholderTextColor="#666"
        />
      </ThemedView>
      
      <ThemedView style={styles.inputContainer}>
        <ThemedText>password</ThemedText>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError('');
          }}
          secureTextEntry
          placeholder=""
          placeholderTextColor="#666"
        />
      </ThemedView>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin}
      >
        <ThemedText style={styles.buttonText}>Next</ThemedText>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.linkButton} 
        onPress={() => router.push('/')}
      >
        <ThemedText style={styles.linkText}>Back to Home</ThemedText>
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
  linkButton: {
    marginTop: 15,
  },
  linkText: {
    color: '#4E5DE1',
    textDecorationLine: 'underline',
  },
}); 