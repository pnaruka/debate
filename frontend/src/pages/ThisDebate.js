import { Box, Button, Container, FormControl, HStack, Heading, Select, Skeleton, Spacer, Textarea } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { appendArg, getArgs, getDebateInfo } from '../contexts_store/reducer/args'
import { useDispatch, useSelector } from 'react-redux';
import GuestHeader from '../components/GuestHeader';
import { getUser } from '../contexts_store/reducer/user';
import { useCreateArg } from '../hooks/useCreateArg';
import { useFetchArgs } from '../hooks/useFetchArgs';
import { useParams } from 'react-router-dom';
import { socketConnect } from '../utils/socketUtil';
import Argument from '../components/Argument';


const ThisDebate = () => {
  const { id } = useParams();
  const user = useSelector(getUser);
  const arg = useSelector(getArgs);
  const currDebate = useSelector(getDebateInfo);
  const [content, setContent] = useState('');
  const [opinionIn, setOpinionIn] = useState('FAVOUR');
  const { createArg } = useCreateArg();
  const { fetchArgs, isLoading } = useFetchArgs();
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
        : <></>
      }
      <Box>
        {
          isLoading ? 
          <Skeleton/>
        :
        <HStack mt="30px" fontFamily="args">
        {
          arg.favour && arg.favour.length > 0 ?
          <Argument args={arg.favour} opinion="FAVOUR"/>
          :
          <></>
        }
        <Spacer />
        {
          arg.favour && arg.favour.length > 0 ?
          <Argument args={arg.against} opinion="AGAINST"/>
          :
          <></>
        }
      </HStack>
        }
      </Box>
      {user ?
        <Box mt="50px" mb="30px">
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