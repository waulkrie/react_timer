import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styled } from 'nativewind';
import { useSignIn } from '@clerk/clerk-expo';

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledText = styled(Text);

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <StyledView className='flex-1 items-center justify-start bg-zinc-200 px-4'>
      <View>
        <TextInput
          autoCapitalize='none'
          value={emailAddress}
          placeholder='Email...'
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </View>

      <View>
        <TextInput
          value={password}
          placeholder='Password...'
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity onPress={onSignInPress}>
        <StyledText className='text-lg text-red-600'>Sign in</StyledText>
      </TouchableOpacity>
    </StyledView>
  );
}
