import {
  Button,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Portal,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaWeightHanging } from 'react-icons/fa';
import { toast } from 'react-toastify';

const SetWeightButton = ({ onSubmit, obj, body = '', header = 'Weight' }) => {
  const [showWeightForm, setShowWeightForm] = useState(false);

  const submitWeight = (e) => {
    if (e.target.value >= 0) {
      onSubmit(e, obj);
      setShowWeightForm(false);
    } else {
      toast.error('Invalid weight');
      e.target.select();
    }
  };

  return (
    <Popover trigger='hover' colorScheme='green'>
      <PopoverTrigger>
        {!showWeightForm ? (
          <Button
            leftIcon={<FaWeightHanging size={15} />}
            onClick={(e) => {
              e.stopPropagation();
              setShowWeightForm(true);
            }}
            variant='ghost'
            borderRadius='full'
            // colorScheme='purple'
          >
            {obj.weight}
          </Button>
        ) : (
          <NumberInput
            size='sm'
            defaultValue={obj.weight}
            min={0}
            max={9999}
            onClick={(e) => e.stopPropagation()}
          >
            <NumberInputField
              borderRadius='10px'
              minW='55px'
              maxW='80px'
              autoFocus
              onFocus={(e) => e.target.select()}
              onBlur={(e) => submitWeight(e)}
              onKeyUp={(e) => e.key === 'Enter' && submitWeight(e)}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        )}
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverHeader>{`${header}: ${obj.weight}`}</PopoverHeader>
          <PopoverBody>{body}</PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default SetWeightButton;
