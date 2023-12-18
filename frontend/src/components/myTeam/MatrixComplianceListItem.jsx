import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Heading,
  Progress,
} from '@chakra-ui/react';
import React from 'react';

const MatrixComplianceListItem = ({ userSkills, matrix }) => {
  return (
    <Card flexDir='row' flexWrap='wrap' size='sm'>
      <CardHeader display='flex' alignItems='center' maxW='300px'>
        <Heading size='sm'>{matrix.name}</Heading>
      </CardHeader>
      <CardBody display='flex' alignItems='center'>
        <Progress
          flex='1'
          hasStripe
          isIndeterminate
          colorScheme='green'
          variant='outline'
          minW='200px'
          borderRadius='28px'
        />
      </CardBody>
      <CardFooter>
        <ButtonGroup variant='ghost' colorScheme='purple' size='sm'>
          <Button>Assign</Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default MatrixComplianceListItem;
