import { Box, Container, Flex, Heading, Spacer, StackDivider, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { getArgs, getDebateInfo } from '../contexts_store/reducer/args'
import { useSelector } from 'react-redux';

const ThisDebate = () => {
  const arg = useSelector(getArgs);
  const debate = useSelector(getDebateInfo);

  return (
    <Container>
      <Container>
        <Heading mt='50px'>{debate.debateName}</Heading>
        <Heading size='md'>started by: {debate.organiser.name}</Heading>
      </Container>
      <Flex mt="30px">
        <Box w='200px' h='10' >
          <VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing={4}
            align='stretch'
          >
            {arg.favour.length > 0 ?
              arg.favour.map((f) =>
                <Box bg='green.100'>
                  <Text>{f.content}</Text>
                  <Text>:{f.participant.name} </Text>
                </Box>
              )
              : <></>
            }
          </VStack>
        </Box>
        <Spacer />
        <Box w='200px' h='10' >
          <VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing={4}
            align='stretch'
          >
            {arg.against.length > 0 ?
              arg.against.map((a) =>
                <Box bg='yellow.100'>
                  <Text>{a.content}</Text>
                  <Text>:{a.participant.name} </Text>
                </Box>
              )
              : <></>
            }
          </VStack>
        </Box>
      </Flex>
    </Container>
  )
}

export default ThisDebate