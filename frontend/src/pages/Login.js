import { Button, Container, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true)
    const {login} = useLogin();

    const loginHandler = async()=>{
        //console.log('here');
        login({ user: { email: email, password: password } });
    }

    return (
        <Container>
            <VStack spacing='5px'>
                <Heading mt='50px'>Login</Heading>
            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter you email...'
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size='md'>
                    <Input
                        type={showPassword ? "text" : 'password'}
                        placeholder='Enter password...'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h="1.75rem" size='sm' onClick={() => { setShowPassword(!showPassword) }}>
                            {showPassword ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
              colorScheme='blue'
              width="100%"
              style={{marginTop:15}}
              onClick={loginHandler}
            >
                Login
            </Button>
        </VStack>
        </Container>
    )
}

export default Login