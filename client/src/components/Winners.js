import React from 'react';
import Loader from 'react-loader-spinner';

import getImageImportPaths from '../importPaths';

class Winners extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			animals: [],
			imagePaths: [],
			error: false
		};
	}

	componentDidMount() {
		fetch('/getwinners')
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

	renderWinners(animals, imagePaths) {
		let animalDOM = animals.map((animal, index) => {
			return (
				<div className="animal" key={index}>
					<div className="animal__img-div">
						<img src={imagePaths[index]} className="animal__img" alt="animal" />
					</div>
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
		if (this.state.error) {
			return <p>Sorry error has occurred and you landed on my Junior Developer Page! Please try back later.</p>;
		} else if (animals.length === 0 && imagePaths.length === 0) {
			return (
				<div className="loader">
					<p>Getting Winners!</p>
					<div className="loader__div">
						<div>
							<Loader type="Puff" color="#00BFFF" height="100" width="100" />
						</div>
					</div>
				</div>
			);
		} else {
			return <div>{this.renderWinners(animals, imagePaths)}</div>;
		}
	}
}

export default Winners;
