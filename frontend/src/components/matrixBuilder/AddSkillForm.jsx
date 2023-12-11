import { useState } from 'react';
import {
  useCreateSkillMutation,
  useGetSkillsQuery,
} from '../../slices/skillsApiSlice';
import { useUpdateCompetenceLevelsMutation } from '../../slices/competenceApiSlice';
import { toast } from 'react-toastify';
import {
  Card,
  Button,
  FormControl,
  Textarea,
  CardFooter,
  CardHeader,
  CardBody,
} from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteCreatable,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';

const AddSkillForm = ({
  stateChanger,
  skills,
  competenceId,
  title,
  toggle,
}) => {
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');

  const [createSkill, createSkillObj] = useCreateSkillMutation();
  const { data = [], isLoading } = useGetSkillsQuery();
  const [updateCompetenceLevels] = useUpdateCompetenceLevelsMutation();

  const selectAutoCompleteHandler = (skill) => {
    setSummary(skill.summary);
    setDescription(skill.description);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const skill =
        data.find((s) => s.summary === summary) ||
        (await createSkill({ summary, description }).unwrap());

      const skillReference = { weight: 1, skillId: skill._id };

      stateChanger([...skills, skillReference]);
      await updateCompetenceLevels([
        { [title]: [...skills, skillReference] },
        competenceId,
      ]).unwrap();

      toast.success(`Skill added to ${title}`);
      toggle();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Card p={1} rounded='md' variant='outline'>
      <form onSubmit={submitHandler}>
        <CardHeader p={1}>
          <FormControl>
            <AutoComplete isLoading={isLoading} creatable maxSuggestions={5}>
              <AutoCompleteInput
                borderRadius='6px'
                autoFocus
                placeholder='Summary'
                size='sm'
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
              <AutoCompleteList>
                {data.map((skill) => (
                  <AutoCompleteItem
                    key={skill._id}
                    value={skill.summary}
                    onClick={() => selectAutoCompleteHandler(skill)}
                    // onKeyUp={(e) =>
                    //   e.key === 'Enter' && selectAutoCompleteHandler(skill)
                    // }
                  >
                    {skill.summary}
                  </AutoCompleteItem>
                ))}
                <AutoCompleteCreatable />
              </AutoCompleteList>
            </AutoComplete>
          </FormControl>
        </CardHeader>

        <CardBody p={1}>
          <FormControl>
            <Textarea
              placeholder='Description'
              value={description}
              size='xs'
              resize='vertical'
              borderRadius='6px'
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
        </CardBody>
        <CardFooter p={2} justifyContent='space-evenly'>
          <Button
            isLoading={createSkillObj.isLoading}
            colorScheme='purple'
            type='submit'
          >
            Submit
          </Button>
          <Button colorScheme='purple' variant='outline' onClick={toggle}>
            Cancel
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddSkillForm;
