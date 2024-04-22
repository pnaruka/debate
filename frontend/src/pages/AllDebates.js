import React, { useEffect } from 'react'
import { useFetchDebates } from '../hooks/useFetchDebates';
import { useSelector } from 'react-redux';
import { getDebates } from '../contexts_store/reducer/debates';
import { Button, Card, CardBody, CardFooter, CardHeader, Container, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../contexts_store/reducer/user';
import GuestHeader from '../components/GuestHeader';
import CreateDebate from '../components/CreateDebate';

const AllDebates = () => {
  const user = useSelector(getUser);
  const { fetchDebates } = useFetchDebates();
  const debates = useSelector(getDebates)
  const navigate = useNavigate();

  useEffect(() => {
    fetchDebates();
  }, []);

  const viewDebate = async (db) => {
    navigate(`/thisdebate/${db._id}`);
  }

  return (
    <Container maxW='md' mt="10px">
      {user ?
        <CreateDebate/>
        :
        <GuestHeader />
      }
      <Heading mt='10px'>Explore debates</Heading>
      <SimpleGrid mt='50px' spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        {debates.length > 0 ?
          debates.map((db) =>
            <Card key={db._id}>
              <CardHeader>
                <Heading size='md'> {db.debateName} </Heading>
              </CardHeader>
              <CardBody>
                <Text> Started by: {db.organiser.name} </Text>
              </CardBody>
              <CardFooter>
                <Button onClick={() => { viewDebate(db) }}>View here</Button>
              </CardFooter>
            </Card>
          )
          : <></>
        }
      </SimpleGrid>
    </Container>
  )
}

export default AllDebates