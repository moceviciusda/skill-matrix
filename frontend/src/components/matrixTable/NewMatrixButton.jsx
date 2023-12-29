import { Button } from '@chakra-ui/react';
import { useCreateMatrixMutation } from '../../slices/matrixApiSlice';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const NewMatrixButton = () => {
  const [createMatrix, { isLoading }] = useCreateMatrixMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const clickHandler = async () => {
    try {
      const matrix = await createMatrix({
        name: 'New Matrix',
        ownerId: userInfo._id,
      }).unwrap();
      toast.success(`${matrix.name} created`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Button
        variant='outline'
        colorScheme='purple'
        w='100%'
        isLoading={isLoading}
        onClick={clickHandler}
      >
        New Matrix
      </Button>
    </>
  );
};

export default NewMatrixButton;
