import React from 'react';
import { NavLink } from 'react-router-dom';
import { Text, Button } from '@chakra-ui/react';

const NavItem = ({
  children,
  isLast,
  to = '/',
  variant = 'ghost',
  ...rest
}) => {
  return (
    <NavLink to={to}>
      <Button
        as='span'
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'center',
          gap: '4px',
        }}
        variant={variant}
        {...rest}
      >
        {children}
      </Button>
    </NavLink>
  );
};

export default NavItem;
