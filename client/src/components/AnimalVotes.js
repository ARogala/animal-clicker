import React from 'react';
import toRegex from 'to-regex';

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
					this.getImageImportPaths();
				},
				error => {
					console.log(error);
				}
			);
	}

	getImageImportPaths() {
		/*https://webpack.js.org/guides/dependency-management/
        require.context() function takes 3 args
        1. a directory to search
        2. a flag whether subdirectories should be searched
        3. a regular expression to match files against

        A context module exports a (require) function that takes one argument: the request.
        The exported function has 3 properties: resolve, keys, id
            // console.log(typeof req);
            // console.log(req);
            // console.log(req.keys);
            // //pass the key back into require to get the import
            // console.log(req(req.keys()[0]));
            // req.keys().forEach(function(key){
            //     req(key);
            //     console.log(req(key));
            // });

            once we have all import paths we can filter based
            on a RegExp and build the DOM img elements
        */
		let animals = this.state.animals;
		let req = require.context('../images', true, /.*\.jpg$/);
		let filteredKeys = [];

		for (let i = 0; i < animals.length; i++) {
			const regex = toRegex(`./${animals[i].name}.jpg`);
			const filteredKeysTemp = req.keys().filter(key => key.match(regex));
			filteredKeys.push(filteredKeysTemp[0]);
		}
		//console.log(animals);
		//console.log(filteredKeys);
		const imagePaths = filteredKeys.map(key => req(key));
		this.setState({ imagePaths: imagePaths });
		//console.log(imagePaths);
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
				<div key={index}>
					<img src={imagePaths[index]} className="App-logo" alt="logo" style={{ maxWidth: '400px' }} />

					<button onClick={() => this.vote(animal.name)}>Vote</button>
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
			return <div>Fetching Animals...</div>;
		} else {
			return <div>{this.renderAnimals(animals, imagePaths)}</div>;
		}
	}
}

export default AnimalVotes;
