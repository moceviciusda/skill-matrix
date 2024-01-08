import { HStack, IconButton, Input, Spacer, Tab, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import SetWeightButton from './SetWeightButton';
import { IoClose } from 'react-icons/io5';
import { useUpdateMatrixMutation } from '../../slices/matrixApiSlice';
import { toast } from 'react-toastify';

const MatrixBuilderTab = ({ index, onClick, category, matrix }) => {
  const [editing, setEditing] = useState(false);
  const [updateMatrix] = useUpdateMatrixMutation();

  const updateCategory = (updatedCategory) => {
    const body = {
      categories: [...matrix.categories],
    };
    body.categories.splice(
      body.categories.indexOf(category),
      1,
      updatedCategory
    );

    updateMatrix([body, matrix._id]);
  };

  const updateNameHandler = (e) => {
    console.log(e);
    if (e.relatedTarget.id !== 'input' + index) {
      e.target.value !== category.name &&
        updateCategory({ ...category, name: e.target.value });

      setEditing(false);
    }
  };

  const submitWeightHandler = (e, category) => {
    if (parseFloat(e.target.value) != category.weight) {
      updateCategory({ ...category, weight: e.target.value });
    }
  };

  const removeCategoryHandler = async () => {
    const body = {
      categories: matrix.categories.filter((cat) => cat !== category),
    };

    try {
      await updateMatrix([body, matrix._id]).unwrap();
      toast.success(`Category: "${category.name}" removed`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Tab
      as='div'
      cursor='pointer'
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => onClick(index)}
      borderRadius={8}
      _selected={{
        bg: 'purple.100',
        boxShadow: '0px 4px 2px 1px var(--chakra-colors-purple-400)',
      }}
      _hover={{
        bg: 'purple.100',
        boxShadow: '0px 4px 2px 1px var(--chakra-colors-purple-400)',
      }}
      _active={{
        boxShadow: '0px 0px 4px -12px var(--chakra-colors-purple-400)',
      }}
    >
      <HStack gap='2px'>
        {editing ? (
          <Input
            id={'input' + index}
            border={0}
            _focusVisible={{ boxShadow: 'none', outline: 'none' }}
            defaultValue={category.name}
            onMouseDown={(e) => e.preventDefault()}
            autoFocus
            onClick={(e) => e.stopPropagation()}
            onFocus={(e) => e.target.select()}
            onBlur={(e) => updateNameHandler(e)}
            onKeyUp={(e) => e.key === 'Enter' && updateNameHandler(e)}
          />
        ) : (
          <>
            <Text textTransform='capitalize'>{category.name}</Text>
            <IconButton
              icon={<FaEdit />}
              isRound={true}
              variant='ghost'
              // colorScheme='purple'
              onClick={(e) => {
                e.stopPropagation();
                setEditing(true);
              }}
            />
          </>
        )}

        <SetWeightButton
          size={20}
          onSubmit={submitWeightHandler}
          obj={category}
          header='Category Weight'
          body='Used to determine importance of category within matrix. 
            Matrix completion percentage is a ratio of 
            (category completion ratio * category weight) / (weight sum of all categories within matrix)'
        />
        <IconButton
          icon={<IoClose size={20} />}
          isRound={true}
          variant='ghost'
          onClick={(e) => {
            e.stopPropagation();
            removeCategoryHandler(category);
          }}
        />
      </HStack>
    </Tab>
  );
};

export default MatrixBuilderTab;
