import { Button, Container, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const {signup} = useSignup();

    const signupHandler = async () => {
        signup({user:{name, email, password}});
      }

    return (
        <Container>
            <VStack spacing='5px'>
                <Heading mt='50px'>Singup</Heading>
            <FormControl id='name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter you name...'
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                />
            </FormControl>
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
              onClick={()=>{signupHandler()}}
            >
                Signup
            </Button>
        </VStack>
        </Container>
    )
}

export default Signup