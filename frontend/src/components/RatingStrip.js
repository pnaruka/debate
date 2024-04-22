import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";

const RatingStrip = () => {
  const [hoveredRating, setHoveredRating] = useState(null);

  return (
    <Flex>
      {[1, 2, 3, 4, 5].map((rating) => (
        <Box
          key={rating}
          w="20px"
          h="20px"
          textAlign="center"
          lineHeight="20px"
          cursor="pointer"
          _hover={{ color: "blue.500" }}
          onMouseEnter={() => setHoveredRating(rating)}
          onMouseLeave={() => setHoveredRating(null)}
        >
          {hoveredRating !== null && rating <= hoveredRating ? "★" : "☆"}
        </Box>
      ))}
    </Flex>
  );
};

export default RatingStrip;
