import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { styled } from 'nativewind';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import SignUpScreen from 'components/signUpScreen';
import SignInScreen from 'components/signInScreen';
import SignInWithOAuth from 'components/signInWithOauth';

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledText = styled(Text);

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      // 	http://localhost:8081/react-timer.vercel.com/login
      const response = await fetch('https://heroku.app', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }).then((res) => {
        // res.json();
        console.log('Login successful', res.json());
      });
    } catch (error) {
      // Handle login error
      console.error('Login failed', error);
    }
  };

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
