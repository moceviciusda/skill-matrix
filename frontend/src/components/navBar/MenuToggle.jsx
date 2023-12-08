import { IoMenu, IoClose } from 'react-icons/io5';
import { Box } from '@chakra-ui/react';

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
      {isOpen ? <IoClose /> : <IoMenu />}
    </Box>
  );
};

export default MenuToggle;
