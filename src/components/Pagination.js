import React, { useState, useEffect } from 'react';
import request from 'superagent';
import { Grid } from '@chakra-ui/react'
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

	return (
    <Grid className='pagination' templateColumns='repeat(5, 1fr)' gap={6} margin='1rem'>
			{userData.slice(activePage * 10, activePage * 10 + 10).map((user) => {
				return (
          <UserCard picture={user.picture} name={user.name} age={user.age} username={ user.username}/>
				);
			})}
			<div>
				<button onClick={() => setActivePage(activePage + 1)}>+</button>
				{pageNumbers.map((number) => (
					<button
						key={number}
						style={
							activePage === number
								? { backgroundColor: 'blue', color: 'white' }
								: { backgroundColor: '' }
						}
						onClick={() => setActivePage(number)}
					>
						{number}
					</button>
				))}
				<button onClick={() => setActivePage(activePage - 1)}>-</button>
			</div>
		</Grid>
	);
}

export default Pagination
