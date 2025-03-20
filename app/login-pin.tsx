import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

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
    const storedPin = sessionStorage.getItem('auth_pin');
    
    if (pin === storedPin) {
      // Move to email verification
      router.push('/login-email');
    } else {
      setError('Invalid PIN');
      setPin('');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">PIN Verification</ThemedText>
      </ThemedView>
      
      {error ? (
        <ThemedView style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        </ThemedView>
      ) : null}
      
      <ThemedView style={styles.pinContainer}>
        <ThemedText style={styles.pinInstructions}>enter your pin.</ThemedText>
        <ThemedView style={styles.pinDisplay}>
          <ThemedText style={styles.pinText}>{pin.replace(/./g, '*')}</ThemedText>
        </ThemedView>
      </ThemedView>
      
      <ThemedView style={styles.keypadContainer}>
        <ThemedView style={styles.keypadRow}>
          {[1, 2, 3].map(num => (
            <TouchableOpacity 
              key={num} 
              style={styles.keypadButton} 
              onPress={() => handleDigit(num.toString())}
            >
              <ThemedText style={styles.keypadText}>{num}</ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
        
        <ThemedView style={styles.keypadRow}>
          {[4, 5, 6].map(num => (
            <TouchableOpacity 
              key={num} 
              style={styles.keypadButton} 
              onPress={() => handleDigit(num.toString())}
            >
              <ThemedText style={styles.keypadText}>{num}</ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
        
        <ThemedView style={styles.keypadRow}>
          {[7, 8, 9].map(num => (
            <TouchableOpacity 
              key={num} 
              style={styles.keypadButton} 
              onPress={() => handleDigit(num.toString())}
            >
              <ThemedText style={styles.keypadText}>{num}</ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
        
        <ThemedView style={styles.keypadRow}>
          <TouchableOpacity style={styles.keypadButton} onPress={handleDelete}>
            <ThemedText style={styles.keypadText}>←</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.keypadButton} 
            onPress={() => handleDigit('0')}
          >
            <ThemedText style={styles.keypadText}>0</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.keypadButton, {opacity: pin.length === 6 ? 1 : 0.5}]} 
            onPress={handleVerify}
            disabled={pin.length !== 6}
          >
            <ThemedText style={styles.keypadText}>→</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
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
    marginBottom: 20,
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
  pinContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  pinInstructions: {
    fontSize: 18,
    marginBottom: 10,
  },
  pinDisplay: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#4E5DE1',
  },
  pinText: {
    fontSize: 24,
    letterSpacing: 10,
  },
  keypadContainer: {
    width: '100%',
    maxWidth: 300,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  keypadButton: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: '#4E5DE1',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keypadText: {
    fontSize: 24,
  },
}); 