import {
  Button,
  useDisclosure,
  HStack,
  IconButton,
  Input,
} from '@chakra-ui/react';
import { IoClose } from 'react-icons/io5';

const AddCategoryForm = ({ addCategoryHandler }) => {
  const { isOpen, onToggle } = useDisclosure();

  const submitHandler = async (e) => {
    onToggle();
    if (!e.target.value.length || e.relatedTarget?.id === 'close') {
      return;
    } else {
      await addCategoryHandler(e.target.value);
    }
  };

  return (
    <>
      {!isOpen && (
        <Button
          w='100%'
          p={6}
          colorScheme='purple'
          variant='ghost'
          onClick={onToggle}
        >
          Add Category
        </Button>
      )}
      {isOpen && (
        <Button
          as='div'
          w='100%'
          cursor='pointer'
          p={6}
          colorScheme='purple'
          variant='ghost'
        >
          <HStack gap='2px' flexGrow={1}>
            <Input
              border={0}
              _focusVisible={{ boxShadow: 'none', outline: 'none' }}
              autoFocus
              onBlur={(e) => submitHandler(e)}
              onKeyUp={(e) => e.key === 'Enter' && submitHandler(e)}
            />

            <IconButton
              id='close'
              icon={<IoClose size={20} />}
              isRound={true}
              variant='ghost'
              onClick={onToggle}
            />
          </HStack>
        </Button>
      )}
    </>
  );
};

export default AddCategoryForm;
