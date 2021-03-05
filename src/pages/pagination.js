import React, { useState, useEffect } from 'react';
import request from 'superagent';
import { Grid, CircularProgress, Box, Button } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import UserCard from '../components/UserCard';

function Pagination({ users }) {
	const [userData, setUserData] = useState([]);
	const [activePage, setActivePage] = useState(1);
	const pageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	useEffect(() => {
		const mappedUserData = users.results.map((user) => {
			return {
				name: `${user.name.first} ${user.name.last}`,
				username: `${user.login.username}`,
				age: `${user.dob.age}`,
				picture: `${user.picture.large}`,
			};
		});
		setUserData(mappedUserData);
  }, []);
  
	if (!userData.length)
		return (
			<Box
				h='100vh'
				w='100vw'
				d='flex'
				justifyContent='center'
				alignItems='center'
			>
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
					onClick={() => setActivePage(activePage > 0 ? activePage - 1 : pageNumbers.length - 1)}
					m='1'
					leftIcon={<ArrowLeftIcon />}
				/>
				{pageNumbers.map((number) => (
					<Button
						m='1'
						key={number}
						bg={number === activePage ? 'lightskyblue' : ''}
						color={number === activePage ? 'white' : ''}
						onClick={() => setActivePage(number)}
					>
						{number}
					</Button>
				))}
				<Button
					m='1'
					onClick={() => setActivePage(activePage < pageNumbers.length ? activePage + 1 : 0)}
					rightIcon={<ArrowRightIcon />}
				/>
			</Box>
		</Box>
	);
}

export async function getStaticProps() {
	// Call an external API endpoint to get posts.
	// You can use any data fetching library
	const users = await request
		.get('https://randomuser.me/api/?results=110')
		.then((res) => res.body);

	// By returning { props: posts }, the Blog component
	// will receive `posts` as a prop at build time
	return {
		props: {
			users,
		},
	};
}

export default Pagination;
