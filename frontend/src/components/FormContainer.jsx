import { Container, Flex, Box } from '@chakra-ui/react';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Flex justifyContent='center' mt='5'>
        <Box w='100%' maxW='md' p='5' borderWidth='1px' borderRadius='lg'>
          {children}
        </Box>
      </Flex>
    </Container>
  );
};

export default FormContainer;
