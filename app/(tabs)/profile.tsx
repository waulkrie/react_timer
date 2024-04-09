import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { styled } from 'nativewind';
import { ClerkProvider, SignedIn, SignedOut, useSession, useAuth } from '@clerk/clerk-expo';
import SignUpScreen from 'components/signUpScreen';
import SignInScreen from 'components/signInScreen';
import SignInWithOAuth from 'components/signInWithOauth';

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledText = styled(Text);

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { session } = useSession();
  useEffect(() => {
    async function fetchToken() {
      if (session) {
        const rawToken = await session.getToken({ template: 'test_template' });
        console.log('SESSION TOKEN', rawToken);
        // Perform further actions with the token here
      }
    }

    fetchToken();
  }, [session]);

  useEffect(() => {
    if (sessionId) {
      const rawToken = getToken();
      console.log('SESSION TOKEN2', rawToken);
      // Perform further actions with the token here
    }
  }, [sessionId]);

  // Wrap both of the SignUp and SignIn in a view
  return (
    <StyledView className='flex-1 items-center justify-start bg-zinc-200 px-4'>
      <SignedIn>
        <StyledText className='text-lg text-red-600'>You are Signed in</StyledText>
      </SignedIn>
      <SignedOut>
        <StyledView className='flex-1 items-center justify-start bg-zinc-200 px-4'>
          <StyledText className='text-lg text-red-600'>You are Signed out, please login or sign up</StyledText>
        </StyledView>
        <StyledView className='flex-1 items-center justify-start bg-zinc-200 px-4'>
          <SignUpScreen />
          <StyledText className='text-lg text-red-600'>Sign Up</StyledText>
        </StyledView>
        <SignInWithOAuth />
      </SignedOut>
    </StyledView>
  );
}
