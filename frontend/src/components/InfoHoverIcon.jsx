import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';

const InfoHoverIcon = ({ icon, header, body, colorScheme }) => {
  const colors = useColorModeValue('blackAlpha', 'gray');

  return (
    <Popover trigger='hover'>
      <PopoverTrigger>
        <IconButton
          icon={icon}
          isRound={true}
          variant='ghost'
          colorScheme={colorScheme ? colorScheme : colors}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>{header}</PopoverHeader>
        <PopoverBody>{body}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default InfoHoverIcon;
