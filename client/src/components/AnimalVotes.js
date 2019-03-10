import React from 'react';
import Loader from 'react-loader-spinner';

import getImageImportPaths from '../importPaths';

class AnimalVotes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			animals: [],
			imagePaths: [],
			voting: false,
			error: false
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
					this.setState({ error: true });
				}
			);
	}

	vote(animalName) {
		this.setState({ voting: true });
		const body = JSON.stringify({ name: animalName });
		fetch('/vote', { method: 'PUT', body: body, headers: { 'Content-Type': 'application/json' } })
			.then(res => res.json())
			.then(
				result => {
					//console.log(result);
					this.updateVoteCount(result.clickCount, result.name);
					this.setState({ voting: false });
				},
				error => {
					console.log(error);
					this.setState({ voting: false });
					this.setState({ error: true });
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
					{this.state.voting ? (
						<div className="loader">
							<p>Voting</p>
							<div className="loader__div">
								<div>
									<Loader type="Puff" color="#00BFFF" height="50" width="50" />
								</div>
							</div>
						</div>
					) : (
						<div>
							<p>Total Votes: {animal.clickCount}</p>
							<div className="appBtnContainer">
								<button className="appBtn" onClick={() => this.vote(animal.name)}>
									Vote
								</button>
							</div>
						</div>
					)}
				</div>
			);
		});
		return animalDOM;
	}

	render() {
		//console.log(this.state.animals);
		let animals = this.state.animals;
		let imagePaths = this.state.imagePaths;
		if (this.state.error) {
			return <p>Sorry error has occurred and you landed on my Junior Developer Page! Please try back later.</p>;
		} else if (animals.length === 0 && imagePaths.length === 0) {
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
