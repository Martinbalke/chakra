import React from 'react';
import {Box, Image, Text } from '@chakra-ui/react'

const UserCard = ({name, picture, username, age }) => {
  return (
    <Box key={name} d='flex' flexDirection='column' borderRadius='lg' overflow='hidden'>
      <Image src={picture} alt='personal photograph' />
      <Text as='h3' fontSize='lg' fontWeight='bold'>{username}</Text>
      <Text as='h3' fontSize='md'>{name}</Text>
      <Text as='p' fontSize='sm' fontWeight='black' alignSelf='flex-end'>{age}</Text>
    </Box>
  );
};

export default UserCard;