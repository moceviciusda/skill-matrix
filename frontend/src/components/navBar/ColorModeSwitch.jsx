import { Button, Switch, Text, useColorMode } from '@chakra-ui/react';
import { useState } from 'react';

const ColorModeSwitch = ({ variant = 'ghost' }) => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [isChecked, setIsChecked] = useState(colorMode === 'dark');

  return (
    <Button
      as='span'
      sx={{
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        gap: '4px',
      }}
      variant={variant}
      // onClick={toggleColorMode}
    >
      <Switch
        colorScheme='purple'
        isChecked={colorMode === 'dark'}
        onChange={(e) => {
          e.stopPropagation();
          toggleColorMode();
          console.log('switching');
        }}
      />
      Dark Mode
    </Button>
  );
};

export default ColorModeSwitch;
