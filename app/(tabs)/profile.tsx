import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { styled } from 'nativewind';

type account = {
    id: string,
    username: string,
    email: string,
}

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);


export default function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [userid, setUserid] = useState<string>();

    function LoginHelper() {
        return (
            <StyledView className="flex-1 justify-start items-center px-4 bg-black">
                <StyledTextInput
                    className='text-lg text-blue-500'
                    placeholder="user@email.com"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <StyledTextInput
                    className='text-lg text-blue-500'
                    placeholder="password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Button title="Login" onPress={handleLogin} />
            </StyledView>
        )
    }

    const handleLogin = async () => {
        try {
            // 	https://potential-waffle-p59v4w665pqf4vw-80.app.github.dev/login
            const response = await fetch('potential-waffle-p59v4w665pqf4vw-80.app.github.dev/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            const data: account = await response.json();
            console.log('Login Successful', data);

        } catch (error) {
            // Handle login error
            console.error('Login failed', error);
        }
    };

    return (
        LoginHelper()
    );
};
