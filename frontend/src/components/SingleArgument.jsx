import { Box, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import RatingStrip from './RatingStrip';

const SingleArgument = ({arg, opinion}) => {
    const [showRating, setShowRating] = useState(false);
    
    return (
        <Box
            onMouseDownCapture={() => setShowRating(true)}
            onMouseLeave={() => setShowRating(false)}>
            {
                showRating ?
                    <RatingStrip />
                    : <></>
            }
            <Box bg={opinion === 'FAVOUR' ? 'green.100' : "yellow.100"} borderRadius='lg'>
                <Text padding='5px'>{arg.content}</Text>
                <Text bg='#C8A2C8'>:{arg.participant.name} </Text>
            </Box>
        </Box>
    )
}

export default SingleArgument