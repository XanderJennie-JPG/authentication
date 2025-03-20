import { StyleSheet, TouchableOpacity } from 'react-native';
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
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Authentication Hell</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSignUp}
        >
          <ThemedText style={styles.buttonText}>Sign Up</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogIn}
        >
          <ThemedText style={styles.buttonText}>Log In</ThemedText>
        </TouchableOpacity>
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
    marginBottom: 50,
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
  },
  button: {
    backgroundColor: '#4E5DE1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
