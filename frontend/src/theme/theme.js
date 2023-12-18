import { extendTheme } from '@chakra-ui/react';
import { ProgressTheme } from './Progress';
import { SwitchTheme } from './Switch';

const styles = {
  global: {
    ':not(.chakra-dont-set-collapse) > .chakra-collapse': {
      overflow: 'initial !important',
    },
  },
};

const config = { initialColorMode: 'dark' };

const components = { ...ProgressTheme.components, ...SwitchTheme.components };

const theme = extendTheme({ config, styles, components });

export default theme;
