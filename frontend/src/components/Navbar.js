import React from 'react'
import { Flex, Heading, Spacer, Menu, MenuButton, MenuList, MenuItem, Button, Box } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { getUser } from '../contexts_store/reducer/user';
import { useLogout } from '../hooks/useLogOut';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'

const Navbar = () => {
  const user = useSelector(getUser);
  const { logout } = useLogout();

  return (
    <Flex bg="blue.500" p={4} align="center">
      <Box as="a" href="/debates" textDecoration="none" color="white">
        <Heading as="h1" size="md" color="white" mr={4}>
          Debate
        </Heading>
      </Box>
      <Spacer />
      {user ?
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg="blue.500" color="white">
            {user.name}
          </MenuButton>
          <MenuList>
            <ChakraLink textDecoration="none" as={ReactRouterLink} to='/profile'>
              <MenuItem>
                Profile
              </MenuItem>
            </ChakraLink>
            <MenuItem onClick={logout}>
              Log Out
            </MenuItem>
          </MenuList>
        </Menu>
        :
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
      }

    </Flex>
  );
}

export default Navbar