import React from 'react'
import { Heading } from "@chakra-ui/react";
import { Link } from 'react-router-dom';

const GuestHeader = () => {
  return (
    <Heading lineHeight='tall' as='h3' size='lg'>
      <Link to={'/login'}>Login</Link> or <Link to={'/signup'}>Signup</Link> to interact.
    </Heading>
  )
}

export default GuestHeader