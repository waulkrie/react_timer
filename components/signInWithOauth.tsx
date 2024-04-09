import React, { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Button } from 'react-native';
import { useOAuth, useAuth, useSession } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from '../hooks/useWarmUpBrowser';

WebBrowser.maybeCompleteAuthSession();

function SignInWithOAuth() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { session } = useSession();

  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({
    strategy: 'oauth_google',
  });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        console.log('User signed in');
        console.log('Session ID:', createdSessionId);
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);

  return <Button title='Sign in with Google' onPress={onPress} />;
}
export default SignInWithOAuth;
