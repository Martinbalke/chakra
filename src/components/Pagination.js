import React, { useState, useEffect } from 'react';
import request from 'superagent';
import { Grid, CircularProgress, Box, Button } from '@chakra-ui/react'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import UserCard from './UserCard'

function Pagination() {
	const [userData, setUserData] = useState([]);
	const [activePage, setActivePage] = useState(1);
	const pageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	useEffect(() => {
		async function getUserData() {
			let users = await request
				.get('https://randomuser.me/api/?results=110')
				.then((res) => res.body);
			users = users.results.map((user) => {
				return {
					name: `${user.name.first} ${user.name.last}`,
					username: `${user.login.username}`,
					age: `${user.dob.age}`,
					picture: `${user.picture.large}`,
				};
			});

			setUserData(users);
		}
		getUserData();
	}, []);
  if (!userData.length) return (
		<Box h='100vh' w='100vw' d='flex' justifyContent='center' alignItems='center'>
			<CircularProgress isIndeterminate color='green.300' />
		</Box>
	);
	return (
		<Box
			d='flex'
			flexDirection='column'
			className='pagination'
			margin='4'
			p='2'
		>
			<Grid templateColumns='repeat(5, 1fr)' gap={6} margin='4' p='2'>
				{userData.slice(activePage * 10, activePage * 10 + 10).map((user) => {
					return (
						<UserCard
							picture={user.picture}
							name={user.name}
							age={user.age}
							username={user.username}
						/>
					);
				})}
			</Grid>
			<Box d='flex' position='asbolute' alignSelf='center' bottom='0'>
				<Button
					onClick={() => setActivePage(activePage - 1)}
					m='1'
					leftIcon={<ArrowLeftIcon />}
				/>
				{pageNumbers.map((number) => (
					<Button
						m='1'
						key={number}
            bg={ number === activePage ? 'lightskyblue' : '' }
            color={ number === activePage ? 'white' : '' }
						onClick={() => setActivePage(number)}
					>
						{number}
					</Button>
				))}
				<Button
					m='1'
					onClick={() => setActivePage(activePage + 1)}
					rightIcon={<ArrowRightIcon />}
				/>
			</Box>
		</Box>
	);
}

export default Pagination
