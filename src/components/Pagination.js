import React, { useState, useEffect } from 'react';
import request from 'superagent';

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
					picture: `${user.picture.medium}`,
				};
			});

			setUserData(users);
		}
		getUserData();
	}, []);

	return (
			<div className='pagination'>
				{userData.slice(activePage * 10, activePage * 10 + 10).map((user) => {
					return (
						<div key={user.name}>
							<h3>{user.name}</h3>
							<h3>{user.username}</h3>
							<p>{user.age}</p>
							<img src={user.picture} alt='personal photograph' />
						</div>
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
			</div>
	);
}

export default Pagination
