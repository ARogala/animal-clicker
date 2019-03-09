import React from 'react';
import Loader from 'react-loader-spinner';

import getImageImportPaths from '../importPaths';

class AnimalVotes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			animals: [],
			imagePaths: []
		};
	}

	componentDidMount() {
		fetch('/getallanimals')
			.then(res => res.json())
			.then(
				result => {
					this.setState({ animals: result });
					const imagePaths = getImageImportPaths(result);
					this.setState({ imagePaths: imagePaths });
				},
				error => {
					console.log(error);
				}
			);
	}

	vote(animalName) {
		const body = JSON.stringify({ name: animalName });
		fetch('/vote', { method: 'PUT', body: body, headers: { 'Content-Type': 'application/json' } })
			.then(res => res.json())
			.then(
				result => {
					//console.log(result);
					this.updateVoteCount(result.clickCount, result.name);
				},
				error => {
					console.log(error);
				}
			);
	}

	updateVoteCount(voteCount, animalName) {
		let animals = this.state.animals;
		for (let i = 0; i < animals.length; i++) {
			if (animals[i].name === animalName) {
				animals[i].clickCount = voteCount;
			}
		}
		this.setState({ animals: animals });
	}

	renderAnimals(animals, imagePaths) {
		let animalDOM = animals.map((animal, index) => {
			return (
				<div className="animal" key={index}>
					<div className="animal__img-div">
						<img src={imagePaths[index]} className="animal__img" alt="animal" />
					</div>
					<p>Total Votes: {animal.clickCount}</p>
					<div className="appBtnContainer">
						<button className="appBtn" onClick={() => this.vote(animal.name)}>
							Vote
						</button>
					</div>
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
			return (
				<div className="loader">
					<p>Getting Animals!</p>
					<div className="loader__div">
						<div>
							<Loader type="Puff" color="#00BFFF" height="100" width="100" />
						</div>
					</div>
				</div>
			);
		} else {
			return <div>{this.renderAnimals(animals, imagePaths)}</div>;
		}
	}
}

export default AnimalVotes;
