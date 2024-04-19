import { Box, Center, Flex, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { getUser } from '../contexts_store/reducer/user';
import { useSelector } from 'react-redux';

const Homepage = () => {
  const user = useSelector(getUser);

  return (
    <Box textAlign="center" p={10}>
      <Center>
        <Image src="/debateHomepage.jpg" alt="homepageimg" h='400px' w='800px' />
      </Center>
      <Heading as="h1" size="xl" mt={6} mb={4}>
        Welcome to Debate
      </Heading>
      <Heading as="h2" size="md" mb={6}>
        A Civilized Alternative to Conflict and Silence
      </Heading>
      <Center>
        <Box maxH="50%" maxW="50%">
          <Text fontSize="xl" mb={8}>
            In the realm of human interaction, there are two extremes: conflict and silence. Historically, conflicts have been resolved through battles, while silence has often been chosen as an avoidance mechanism. However, nestled between these extremes lies a powerful tool: debate.
          </Text>
        </Box>
      </Center>
      <Box>
        <Flex justify="center">
          <Box
            as="a"
            href="/debates"
            display="inline-block"
            bg="blue.500"
            color="white"
            rounded="md"
            py={2}
            px={4}
            fontSize="lg"
            textDecoration="none"
            _hover={{ bg: 'blue.600' }}
            mr={4}
          >
            Discover debates
          </Box>
          {
            user ?
              <></>
              :
              <>
                <Box
                  as="a"
                  href="/login"
                  display="inline-block"
                  bg="blue.500"
                  color="white"
                  rounded="md"
                  py={2}
                  px={4}
                  fontSize="lg"
                  textDecoration="none"
                  _hover={{ bg: 'blue.600' }}
                  mr={4}
                >
                  Login
                </Box>
                <Box
                  as="a"
                  href="/signup"
                  display="inline-block"
                  bg="blue.500"
                  color="white"
                  rounded="md"
                  py={2}
                  px={4}
                  fontSize="lg"
                  textDecoration="none"
                  _hover={{ bg: 'blue.600' }}
                >
                  Signup
                </Box>
              </>
          }


        </Flex>
      </Box>
    </Box>
  )
}

export default Homepage