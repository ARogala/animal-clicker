import React from 'react';

const About = () => {
	return (
		<div className="about">
			<h3>About</h3>
			<p>
				Animal clicker is a simple but fun game! Every Monday a new set of five animals will be pulled from the database
				and displayed. You can vote for as many animals as many times as you would like all week long. Then all
				day on Sunday come back to see the top three animals. Tell your friends and family to get voting!
			</p><br/>

			<h3>The Tech Used</h3>
			<p>
				This is the first full stack application I wrote and I will admit its pretty simple.
				The back end is coded in NodeJS making use of the Express server framework. I used Mongodb hosted on mlab for the
				database and ReactJS with SASS for the front-end! Thus making this my first MERN stack application. Enjoy!
			</p>
		</div>
	);
};

export default About;
