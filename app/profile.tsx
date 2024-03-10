import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';


export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      // 	http://localhost:8081/react-timer.vercel.com/login
      const response = await fetch('react-timer.vercel.com/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
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

  return (
    <View className="flex-1 justify-start items-center px-4 bg-black">
      <TextInput
        className='text-lg text-blue-500'
        placeholder="user@email.com"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        className='text-lg text-blue-500'
        placeholder="password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

