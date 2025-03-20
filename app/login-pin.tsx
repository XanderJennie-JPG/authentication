import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Platform, View } from 'react-native';
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

export default function LoginPinScreen() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  
  const handleDigit = (digit: string) => {
    if (pin.length < 6) {
      setPin(prev => prev + digit);
      setError('');
    }
  };
  
  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
    setError('');
  };
  
  const handleVerify = () => {
    if (pin.length !== 6) {
      setError('Please enter your 6-digit PIN');
      return;
    }
    
    // Check PIN against sessionStorage
    const storedPin = getFromStorage('auth_pin');
    
    if (pin === storedPin) {
      // Move to email verification
      router.push('/login-email');
    } else {
      setError('Invalid PIN');
      setPin('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.headerGroup}>
          <ThemedText style={styles.headerText}>verify pin</ThemedText>
        </View>
        
        {error ? (
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          </View>
        ) : null}
        
        <View style={styles.pinContainer}>
          <View style={styles.pinDisplay}>
            <ThemedText style={styles.pinText}>{pin.replace(/./g, '*')}</ThemedText>
          </View>
        </View>
        
        <View style={styles.keypadContainer}>
          <View style={styles.keypadGrid}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <TouchableOpacity 
                key={num} 
                style={styles.keypadButton} 
                onPress={() => handleDigit(num.toString())}
              >
                <ThemedText style={styles.keypadText}>{num}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
              <ThemedText style={styles.keypadText}>←</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.keypadButton} 
              onPress={() => handleDigit('0')}
            >
              <ThemedText style={styles.keypadText}>0</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, {opacity: pin.length === 6 ? 1 : 0.5}]} 
              onPress={handleVerify}
              disabled={pin.length !== 6}
            >
              <ThemedText style={styles.keypadText}>→</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
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
  pinContainer: {
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2a3c5d',
    padding: 20,
  },
  pinDisplay: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#85a8ff',
  },
  pinText: {
    color: '#85a8ff',
    fontSize: 32,
    letterSpacing: 10,
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  keypadContainer: {
    width: '100%',
    padding: 20,
  },
  keypadGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  keypadButton: {
    width: '30%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#2a3c5d',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '30%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#85a8ff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keypadText: {
    color: '#85a8ff',
    fontSize: 24,
    fontFamily: 'monospace',
  },
}); 