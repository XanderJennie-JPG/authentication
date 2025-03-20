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

export default function LoginEmailScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const handleVerify = () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Check email against sessionStorage
    const storedEmail = getFromStorage('auth_email');
    
    if (email === storedEmail) {
      // Move to security question verification
      router.push('/login-security');
    } else {
      setError('Email doesn\'t match the registered email');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.headerGroup}>
          <ThemedText style={styles.headerText}>verify email</ThemedText>
        </View>
        
        {error ? (
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          </View>
        ) : null}
        
        <View style={styles.inputGroup}>
          <ThemedText style={styles.inputLabel}>enter your email address</ThemedText>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError('');
            }}
            placeholder="youremail@example.com"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
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