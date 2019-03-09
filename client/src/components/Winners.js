import React from 'react';

import getImageImportPaths from '../importPaths';

class Winners extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			animals: [],
			imagePaths: []
		};
	}

	componentDidMount() {
		fetch('/getwinners')
			.then(res => res.json())
			.then(
				result => {
					this.setState({ animals: result });
					const imagePaths = getImageImportPaths(result);
					this.setState({imagePaths: imagePaths});
				},
				error => {
					console.log(error);
				}
			);
	}

	renderWinners(animals, imagePaths) {
		let animalDOM = animals.map((animal, index) => {
			return (
				<div key={index}>
					<img src={imagePaths[index]} className="App-logo" alt="logo" style={{ maxWidth: '400px' }} />
					<p>Total Votes: {animal.clickCount}</p>
				</div>
			);
		});
		return animalDOM;
	}

	render() {
		//console.log(this.state.animals);
		let animals = this.state.animals;
		let imagePaths = this.state.imagePaths;
		if (animals.length === 0 && imagePaths.length === 0) {
			return <div>Fetching Winners...</div>;
		} else {
			return <div>{this.renderWinners(animals, imagePaths)}</div>;
		}
	}
}

export default Winners;
