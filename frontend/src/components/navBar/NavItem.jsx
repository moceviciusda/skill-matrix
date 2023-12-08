import React from 'react';
import { NavLink } from 'react-router-dom';
import { Text } from '@chakra-ui/react';

const NavItem = ({ children, isLast, to = '/', ...rest }) => {
  return (
    <NavLink to={to}>
      <Text
        as='span'
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'center',
          gap: '4px',
        }}
        {...rest}
      >
        {children}
      </Text>
    </NavLink>
  );
};

export default NavItem;
