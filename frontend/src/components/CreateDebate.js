import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { getUser } from '../contexts_store/reducer/user';
import { useCreateDebate } from '../hooks/useCreateDebate';

const CreateDebate = () => {
    const user = useSelector(getUser);
    const {createDebate} = useCreateDebate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [title, setTitle] = useState();
    const initialRef = React.useRef(null);

    const createHandler = async()=>{
        createDebate(user, title);
        onClose();
    }

    return (
      <>
        <Button onClick={onOpen}>Start Debate</Button>
  
        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Start a new discussion</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input ref={initialRef}
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                placeholder='What will it be about...' />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={createHandler}>
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default CreateDebate