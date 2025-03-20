import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function LoginSuccessScreen() {
  const router = useRouter();
  
  const handleHome = () => {
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.successGroup}>
          <ThemedText style={styles.successTitle}>Login Successful!</ThemedText>
          <ThemedText style={styles.successMessage}>
            You have successfully logged in to your account.
          </ThemedText>
        </View>
        
        <TouchableOpacity 
          style={styles.cursorButton} 
          onPress={handleHome}
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
  successGroup: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#2a3c5d',
    padding: 20,
  },
  successTitle: {
    color: '#85a8ff',
    fontSize: 32,
    fontFamily: 'monospace',
    marginBottom: 20,
  },
  successMessage: {
    color: '#85a8ff',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'monospace',
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