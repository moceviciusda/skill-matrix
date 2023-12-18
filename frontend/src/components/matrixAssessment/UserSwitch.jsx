import { Avatar, Switch, Tag, Tooltip } from '@chakra-ui/react';

const UserSwitch = ({ user, ...rest }) => {
  return (
    <Tooltip label={user?.name} borderRadius='full'>
      <Tag
        p={1}
        borderRadius='full'
        colorScheme={rest.defaultChecked ? 'green' : 'red'}
      >
        <Avatar size='xs' name={user?.name} marginX={1} />
        <Switch
          marginX={1}
          colorScheme={rest.colorScheme || 'green'}
          {...rest}
        />
      </Tag>
    </Tooltip>
  );
};

export default UserSwitch;
