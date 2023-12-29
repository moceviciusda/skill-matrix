import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Tooltip } from '@chakra-ui/react';

const NavItem = ({ children, to = '/', variant = 'ghost', ...rest }) => {
  return (
    <NavLink to={to}>
      <Tooltip borderRadius='8px' label={rest.label}>
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
      </Tooltip>
    </NavLink>
  );
};

export default NavItem;
