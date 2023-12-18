import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Portal,
} from '@chakra-ui/react';
import { FaWeightHanging } from 'react-icons/fa';

const WeightTag = ({ weight, body = '', header = 'Weight' }) => {
  return (
    <Popover trigger='hover' colorScheme='green'>
      <PopoverTrigger>
        <Button
          leftIcon={<FaWeightHanging size={15} />}
          variant='ghost'
          borderRadius='full'
          // colorScheme='purple'
        >
          {weight}
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverHeader>{`${header}: ${weight}`}</PopoverHeader>
          <PopoverBody>{body}</PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default WeightTag;
