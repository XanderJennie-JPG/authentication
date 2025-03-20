import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Platform, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Helper function to safely use sessionStorage (only available in browser)
const saveToStorage = (key: string, value: string) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.sessionStorage) {
    window.sessionStorage.setItem(key, value);
  }
};

export default function SignupPinScreen() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  
  const handleDigit = (digit: string) => {
    if (pin.length < 6) {
      setPin(prev => prev + digit);
    }
  };
  
  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };
  
  const handleNext = () => {
    if (pin.length !== 6) {
      alert('Please enter a 6-digit PIN');
      return;
    }
    
    // Store in sessionStorage
    saveToStorage('auth_pin', pin);
    
    // Navigate to email screen
    router.push('/signup-email');
  };

  return (
    <View style={styles.container}>
      <View style={styles.pinPadContainer}>
        <View style={styles.pinDisplay}>
          <ThemedText style={styles.pinLabel}>enter your pin.</ThemedText>
          <View style={styles.pinValueContainer}>
            <ThemedText style={styles.pinValue}>{pin.replace(/./g, '*')}</ThemedText>
          </View>
        </View>
        
        <View style={styles.keypadContainer}>
          <View style={styles.keypadGrid}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <TouchableOpacity
                key={num}
                style={styles.keypadButton}
                onPress={() => handleDigit(num.toString())}
              >
                <ThemedText style={styles.keypadText}>{num}</ThemedText>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.keypadButtonEmpty}></TouchableOpacity>
            <TouchableOpacity
              style={styles.keypadButton}
              onPress={() => handleDigit('0')}
            >
              <ThemedText style={styles.keypadText}>0</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.keypadButtonEmpty}></TouchableOpacity>
          </View>
          
          <View style={styles.actionRow}>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={handleDelete}
            >
              <ThemedText style={styles.actionButtonText}>←</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.actionButton, 
                {opacity: pin.length === 6 ? 1 : 0.5}
              ]}
              onPress={handleNext}
              disabled={pin.length !== 6}
            >
              <ThemedText style={styles.actionButtonText}>→</ThemedText>
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
  pinPadContainer: {
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#2a3c5d',
    borderRadius: 5,
    overflow: 'hidden',
  },
  pinDisplay: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2a3c5d',
  },
  pinLabel: {
    color: '#85a8ff',
    fontSize: 18,
    marginBottom: 15,
    fontFamily: 'monospace',
  },
  pinValueContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#85a8ff',
    paddingBottom: 10,
  },
  pinValue: {
    color: '#85a8ff',
    fontSize: 24,
    letterSpacing: 10,
    fontFamily: 'monospace',
  },
  keypadContainer: {
    padding: 20,
  },
  keypadGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  keypadButton: {
    width: '30%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2a3c5d',
    borderRadius: 5,
  },
  keypadButtonEmpty: {
    width: '30%',
    height: 70,
    marginBottom: 15,
  },
  keypadText: {
    color: '#85a8ff',
    fontSize: 24,
    fontFamily: 'monospace',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    width: '48%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2a3c5d',
    borderRadius: 5,
  },
  actionButtonText: {
    color: '#85a8ff',
    fontSize: 24,
    fontFamily: 'monospace',
  },
}); 