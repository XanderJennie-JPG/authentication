import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Platform, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Helper function to safely use sessionStorage (only available in browser)
const saveToStorage = (key: string, value: string) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.sessionStorage) {
    window.sessionStorage.setItem(key, value);
  }
};

export default function SignupEmailScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  
  const handleNext = () => {
    if (!email.trim()) {
      alert('Email is required');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Store in sessionStorage
    saveToStorage('auth_email', email);
    
    // Navigate to security question screen
    router.push('/signup-security');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <ThemedText style={styles.inputLabel}>email address</ThemedText>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
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
          onPress={handleNext}
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
    padding: 0,
    overflow: 'hidden',
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