import {
  Button,
  useDisclosure,
  HStack,
  IconButton,
  Input,
} from '@chakra-ui/react';
import { IoClose } from 'react-icons/io5';
import { useCreateCompetenceMutation } from '../../slices/competenceApiSlice';
import { toast } from 'react-toastify';

const AddCompetenceForm = ({ addCompetenceHandler }) => {
  const { isOpen, onToggle } = useDisclosure();

  const [createCompetence] = useCreateCompetenceMutation();

  const submitHandler = async (e) => {
    onToggle();
    if (!e.target.value.length || e.relatedTarget?.id === 'close') {
      return;
    } else {
      try {
        const competence = await createCompetence({
          name: e.target.value,
        }).unwrap();
        toast.success(`Competence Created: ${competence.name}`);
        await addCompetenceHandler(competence._id);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
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
          Add Competence
        </Button>
      )}
      {isOpen && (
        <Button as='div' w='100%' cursor='pointer' p={6} colorScheme='purple'>
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

export default AddCompetenceForm;
