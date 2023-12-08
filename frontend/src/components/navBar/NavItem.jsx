import React from 'react';
import { NavLink } from 'react-router-dom';
import { HStack, Icon, Text } from '@chakra-ui/react';
import { FaSignInAlt } from 'react-icons/fa';

const NavItem = ({ children, isLast, to = '/', icon, ...rest }) => {
  return (
    <NavLink to={to}>
      {icon && <Icon as={icon} />}
      <Text
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
