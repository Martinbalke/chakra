import React from 'react';
import {Box, Image, Text } from '@chakra-ui/react'
import { CalendarIcon} from '@chakra-ui/icons'
const UserCard = ({name, picture, username, age }) => {
  return (
		<Box
			key={name}
			d='flex'
			flexDirection='column'
			borderRadius='lg'
			overflow='hidden'
		>
			<Image src={picture} alt='personal photograph' objectFit='cover' />
			<Text as='h3' fontSize='lg' fontWeight='bold' pl='2'>
				{username}
			</Text>
			<Text as='h3' fontSize='md' pl='2'>
				{name}
			</Text>
			<Box d='flex' alignItems='center' justifyContent='flex-end'>
				<CalendarIcon color='teal' />
				<Text as='p' fontSize='sm' fontWeight='black' pl='2' color='green.400'>
					{age}
				</Text>
			</Box>
		</Box>
	);
};

export default UserCard;