import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const router = useRouter();
  
  const handleSignUp = () => {
    router.push('/signup');
  };
  
  const handleLogIn = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.headerGroup}>
          <ThemedText style={styles.headerText}>Authentication Hell</ThemedText>
        </View>
        
        <View style={styles.optionGroup}>
          <ThemedText style={styles.optionText}>Select an option:</ThemedText>
          
          <TouchableOpacity 
            style={styles.optionButton} 
            onPress={handleSignUp}
          >
            <ThemedText style={styles.optionButtonText}>Sign up</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.optionButton} 
            onPress={handleLogIn}
          >
            <ThemedText style={styles.optionButtonText}>Log in</ThemedText>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.cursorButton} 
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
    fontSize: 28,
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  optionGroup: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#2a3c5d',
    padding: 20,
  },
  optionText: {
    color: '#85a8ff',
    fontSize: 18,
    fontFamily: 'monospace',
    marginBottom: 20,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#2a3c5d',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    backgroundColor: 'rgba(133, 168, 255, 0.05)',
  },
  optionButtonText: {
    color: '#85a8ff',
    fontSize: 18,
    fontFamily: 'monospace',
    textAlign: 'center',
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
