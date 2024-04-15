import { Stack } from 'expo-router/stack';
import { ClerkProvider } from '@clerk/clerk-expo';
import Constants from 'expo-constants';

export default function AppLayout() {
  return (
    <ClerkProvider publishableKey={Constants.expoConfig?.extra?.clerkPublishableKey}>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
    </ClerkProvider>
  );
}
