import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ title: 'Sign Up' }} />
        <Stack.Screen name="signup-pin" options={{ title: 'Create PIN' }} />
        <Stack.Screen name="signup-email" options={{ title: 'Email Verification' }} />
        <Stack.Screen name="signup-security" options={{ title: 'Security Question' }} />
        <Stack.Screen name="signup-success" options={{ title: 'Success' }} />
        <Stack.Screen name="login" options={{ title: 'Log In' }} />
        <Stack.Screen name="login-pin" options={{ title: 'PIN Verification' }} />
        <Stack.Screen name="login-email" options={{ title: 'Email Verification' }} />
        <Stack.Screen name="login-security" options={{ title: 'Security Question' }} />
        <Stack.Screen name="login-success" options={{ title: 'Success' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
