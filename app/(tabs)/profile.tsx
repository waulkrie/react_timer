import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { styled } from 'nativewind';
import { SignedIn, SignedOut, useSession, useAuth, useUser } from '@clerk/clerk-expo';
import SignUpScreen from 'components/signUpScreen';
import SignInScreen from 'components/signInScreen';
import SignInWithOAuth from 'components/signInWithOauth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledText = styled(Text);
console.log('Config:', Constants.expoConfig?.extra);
const apiUrl = Constants.expoConfig?.extra?.apiURL;

export default function Login() {
  const [_session, setSession] = useState<string>(''); // session jwt token
  const { session } = useSession();
  const { isSignedIn, user, isLoaded } = useUser();

  // consier

  // testing function to naively get session token if clerk updates session object
  useEffect(() => {
    async function fetchToken() {
      if (session) {
        const token = await session.getToken({ template: 'test_template' });
        console.log('SESSION TOKEN', token);
        if (token) {
          setSession(token);
          await AsyncStorage.setItem('sessionToken', token);
        }
      }
    }

    async function fetchProfile(token: string) {
      if (isSignedIn && user) {
        const addr = user.emailAddresses[0].emailAddress;
        console.log('PROFILE addr', addr);
        const uri = apiUrl + '/protected';
        const headers = { method: 'GET', headers: { Authorization: 'Bearer ' + token } };
        console.log('PROFILE uri', uri);
        console.log('PROFILE headers', headers);
        const profile = await fetch(uri, headers)
          .then((response) => {
            console.log('PROFILE response', response);
            response.json();
          })
          .then((data) => console.log(data))
          .catch((error) => console.error('Error:', error));
      }
    }
    fetchToken();
    fetchProfile(_session);
  }, [session]);

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
