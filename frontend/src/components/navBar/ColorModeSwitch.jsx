import { Button, Switch, Text, useColorMode } from '@chakra-ui/react';
import { useState } from 'react';

const ColorModeSwitch = ({ variant = 'ghost' }) => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [isChecked, setIsChecked] = useState(colorMode === 'dark');

  return (
    <Button
      as='label'
      cursor='pointer'
      htmlFor='color-mode-switch'
      sx={{
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        gap: '4px',
      }}
      variant={variant}
    >
      <Switch
        id='color-mode-switch'
        colorScheme='purple'
        isChecked={colorMode === 'dark'}
        onChange={(e) => {
          e.stopPropagation();
          toggleColorMode();
        }}
      />
      <Text>Dark Mode</Text>
    </Button>
  );
};

export default ColorModeSwitch;
