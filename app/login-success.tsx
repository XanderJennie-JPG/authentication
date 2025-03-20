import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function LoginSuccessScreen() {
  const router = useRouter();
  
  const handleHome = () => {
    router.push('/');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.contentContainer}>
        <ThemedText type="title" style={styles.title}>Successful Login!</ThemedText>
        <ThemedText style={styles.message}>
          You have successfully completed all the authentication steps. Welcome to Authentication Hell!
        </ThemedText>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleHome}
        >
          <ThemedText style={styles.buttonText}>Back to Home</ThemedText>
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
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    marginBottom: 20,
    fontSize: 32,
  },
  message: {
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#4E5DE1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 