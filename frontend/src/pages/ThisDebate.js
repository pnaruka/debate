import { Box, Button, Container, FormControl, HStack, Heading, Select, Spacer, StackDivider, Text, Textarea, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { appendArg, getArgs, getDebateInfo } from '../contexts_store/reducer/args'
import { useDispatch, useSelector } from 'react-redux';
import GuestHeader from '../components/GuestHeader';
import { getUser } from '../contexts_store/reducer/user';
import { useCreateArg } from '../hooks/useCreateArg';
import { useFetchArgs } from '../hooks/useFetchArgs';
import { useParams } from 'react-router-dom';
import { socketConnect } from '../utils/socketUtil';


const ThisDebate = () => {
  const { id } = useParams();
  const user = useSelector(getUser);
  const arg = useSelector(getArgs);
  const currDebate = useSelector(getDebateInfo);
  const [content, setContent] = useState('');
  const [opinionIn, setOpinionIn] = useState('FAVOUR');
  const { createArg } = useCreateArg();
  const { fetchArgs } = useFetchArgs();
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log(id);
    if (id)
      fetchArgs(id);
  }, [id])

  useEffect(() => {
    
    if (id) {
      const socket = socketConnect();
      socket.emit('joinDebate', id);
      socket.on('newArgReceive', (data) => {
        if (data.debate === id) {
          dispatch(appendArg(data));
        }
      });
      return () => {
        socket.disconnect();
    };
    }
  }, [id])

  const createOpinion = async () => {
    createArg(user, content, opinionIn, currDebate._id);
    setContent('');
  }

  return (
    <Container>
      {user ?
        <></>
        :
        <GuestHeader />
      }
      {currDebate ?
        <Container>
          <Heading mt='50px'>{currDebate.debateName}</Heading>
          <Heading size='md'>started by: {currDebate.organiser ? currDebate.organiser.name : "Unknown"}</Heading>
        </Container>
        : <></>}
      <Box>
        <HStack mt="30px" fontFamily="body">
          <Box w='200px' >
            <VStack
              divider={<StackDivider borderColor='gray.200' />}
              spacing={4}
              align='stretch'
            >
              {arg.favour && arg.favour.length > 0 ?
                arg.favour.map((f) =>
                  <Box bg='green.100' borderRadius='lg' key={f._id}>
                    <Text padding='5px'>{f.content}</Text>
                    <Text bg='#C8A2C8'>:{f.participant.name} </Text>
                  </Box>
                )
                : <></>
              }
            </VStack>
          </Box>
          <Spacer />
          <Box w='200px' >
            <VStack
              divider={<StackDivider borderColor='gray.200' />}
              spacing={4}
              align='stretch'
            >
              {arg.against && arg.against.length > 0 ?
                arg.against.map((a) =>
                  <Box bg='yellow.100' borderRadius='lg' key={a._id}>
                    <Text padding='5px'>{a.content}</Text>
                    <Text bg='#C8A2C8'>:{a.participant.name} </Text>
                  </Box>
                )
                : <></>
              }
            </VStack>
          </Box>
        </HStack>
      </Box>
      {user ?
        <Box mt="50px">
          <HStack spacing='5px'>
            <FormControl id='content' isRequired>
              <Textarea
                value={content}
                onChange={(e) => { setContent(e.target.value) }}
                placeholder='Express your opinion...' />
            </FormControl>
            <FormControl id='opinion'>
              <Select value={opinionIn} onChange={(e) => { setOpinionIn(e.target.value) }} >
                <option value='FAVOUR'>FAVOUR</option>
                <option value='AGAINST'>AGAINST</option>
              </Select>
            </FormControl>
            <Button
              onClick={createOpinion}
              colorScheme='blue'
            >
              Post
            </Button>
          </HStack>
        </Box>
        :
        <></>
      }
    </Container>
  )
}

export default ThisDebate