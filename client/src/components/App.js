import React, { Component } from 'react';
import toRegex from 'to-regex';
import logo from '../click.svg';

class App extends Component {
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

    render() {
        //console.log(this.state.animals);
        let animals = this.state.animals;
        let imagePaths = this.state.imagePaths;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>Animal Clicker</h1>
                    <h2>Vote for your favorites!</h2>
                </header>
                {animals.length === 0 && imagePaths.length === 0 ? (
                    <div>Fetching Animals...</div>
                ) : (
                    <div>
                        <div>
                            <img src={imagePaths[0]} className="App-logo" alt="logo" style={{ width: '400px' }} />

                            <button onClick={() => this.vote(animals[0].name)}>Vote</button>
                            <p>Total Votes: {animals[0].clickCount}</p>
                        </div>
                        <div>
                            <img src={imagePaths[1]} className="App-logo" alt="logo" style={{ width: '400px' }} />

                            <button onClick={() => this.vote(animals[1].name)}>Vote</button>
                            <p>Total Votes: {animals[1].clickCount}</p>
                        </div>

                        <div>
                            <img src={imagePaths[2]} className="App-logo" alt="logo" style={{ width: '400px' }} />

                            <button onClick={() => this.vote(animals[2].name)}>Vote</button>
                            <p>Total Votes: {animals[2].clickCount}</p>
                        </div>

                        <div>
                            <img src={imagePaths[3]} className="App-logo" alt="logo" style={{ width: '400px' }} />

                            <button onClick={() => this.vote(animals[3].name)}>Vote</button>
                            <p>Total Votes: {animals[3].clickCount}</p>
                        </div>

                        <div>
                            <img src={imagePaths[4]} className="App-logo" alt="logo" style={{ width: '400px' }} />

                            <button onClick={() => this.vote(animals[4].name)}>Vote</button>
                            <p>Total Votes: {animals[4].clickCount}</p>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default App;
