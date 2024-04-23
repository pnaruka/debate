import { Box, SimpleGrid} from '@chakra-ui/react'
import React from 'react'
import SingleArgument from './SingleArgument';

const Argument = ({ args, opinion }) => {


  return (
    <Box
      maxW="400px"
      maxH="400px"
      overflowY="auto"
      borderWidth="1px" 
      borderColor="gray.200" 
      borderRadius="md" 
    >
      <SimpleGrid columns={1} spacing={4} p={4}>
        {args && args.length > 0 ?
          args.map((arg) =>
            <SingleArgument arg={arg} opinion={opinion} key={arg._id} />
          )
          : <></>
        }
      </SimpleGrid>
    </Box>
  )
}

export default Argument