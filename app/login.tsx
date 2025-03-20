import { useState, useEffect } from 'react';
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
    const storedUsername = getFromStorage('auth_username');
    const storedPassword = getFromStorage('auth_password');
    
    if (username === storedUsername && password === storedPassword) {
      // Move to PIN verification
      router.push('/login-pin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.headerGroup}>
          <ThemedText style={styles.headerText}>login</ThemedText>
        </View>
        
        {error ? (
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          </View>
        ) : null}
        
        <View style={styles.inputGroup}>
          <ThemedText style={styles.inputLabel}>username</ThemedText>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setError('');
            }}
            placeholder=""
            placeholderTextColor="#666"
            selectionColor="#85a8ff"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <ThemedText style={styles.inputLabel}>password</ThemedText>
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
            selectionColor="#85a8ff"
          />
        </View>
        
        <TouchableOpacity 
          style={styles.cursorButton} 
          onPress={handleLogin}
        >
          <View style={styles.cursor}></View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.linkButton} 
          onPress={() => router.push('/')}
        >
          <ThemedText style={styles.linkText}>back to home</ThemedText>
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
    borderBottomWidth: 1,
    borderBottomColor: '#2a3c5d',
  },
  cursor: {
    width: 30,
    height: 5,
    backgroundColor: '#85a8ff',
  },
  linkButton: {
    padding: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#85a8ff',
    fontFamily: 'monospace',
    textDecorationLine: 'underline',
  },
}); 