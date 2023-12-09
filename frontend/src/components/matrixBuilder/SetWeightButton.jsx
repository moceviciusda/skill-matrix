import {
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { FaWeightHanging } from 'react-icons/fa';

const SetWeightButton = ({ onSubmit, obj }) => {
  const [showWeightForm, setShowWeightForm] = useState(false);

  const submitWeight = (e) => {
    onSubmit(e, obj);
    setShowWeightForm(false);
  };

  const renderWeightPopover = (props) => (
    <Popover {...props}>
      <Popover.Header>Skill Weight: {obj.weight}</Popover.Header>
      <Popover.Body>
        Used to determine importance of skill within level.
        <br /> Completion ratio of competence level is calculated by dividing
        weight sum of acquired skills by weight sum of skills within level
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      {!showWeightForm ? (
        <OverlayTrigger
          placement='right'
          delay={{ show: 250, hide: 400 }}
          overlay={renderWeightPopover}
        >
          <IconButton
            icon={<FaWeightHanging size={15} />}
            onClick={() => setShowWeightForm(true)}
            variant='ghost'
            isRound={true}
            // colorScheme='purple'
          />
        </OverlayTrigger>
      ) : (
        <NumberInput size='xs' defaultValue={obj.weight}>
          <NumberInputField
            borderRadius='10px'
            minW='55px'
            maxW='80px'
            onBlur={(e) => submitWeight(e)}
            autoFocus
            onFocus={(e) => e.target.select()}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      )}
    </>
  );
};

export default SetWeightButton;
