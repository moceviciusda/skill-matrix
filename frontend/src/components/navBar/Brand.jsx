import { Box, Text } from '@chakra-ui/react';

import React from 'react';
import { NavLink } from 'react-router-dom';

const Brand = (props) => {
  return (
    <Box {...props} flexGrow={1}>
      <NavLink to='/'>
        <Text fontSize='2xl' fontWeight='bold'>
          Skill-Matrix
        </Text>
      </NavLink>
    </Box>
  );
};

export default Brand;
