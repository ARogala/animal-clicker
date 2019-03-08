import React, { Component } from 'react';
import logo from '../click.svg';
import animal1 from '../images/animal15.jpg';
import animal2 from '../images/animal16.jpg';
import animal3 from '../images/animal35.jpg';
import animal4 from '../images/animal30.jpg';
import animal5 from '../images/animal32.jpg';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animals: []
        };
    }

    componentDidMount() {
        fetch('/getallanimals')
            .then(res => res.json())
            .then(
                result => {
                    this.setState({ animals: result });
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
                    console.log(result);
                    this.updateVoteCount(result.clickCount, result.name);
                },
                error => {
                    console.log(error);
                }
            );
    }

    updateVoteCount(voteCount, animalName) {
        let animals = this.state.animals;
        for(let i = 0; i < animals.length; i++ ) {
            if(animals[i].name === animalName) {
                animals[i].clickCount = voteCount;
            }
        }
        this.setState({animals: animals});
    }

    render() {
        console.log(this.state.animals);
        let animals = this.state.animals;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                {animals.length === 0 ? (
                    <div>Fetching Animals...</div>
                ) : (
                    <div>
                        <div>
                            <img src={animal1} className="App-logo" alt="logo" style={{ width: '400px' }} />

                            <button onClick={() => this.vote(animals[0].name)}>Vote</button>
                            <p>Total Votes: {animals[0].clickCount}</p>
                        </div>
                        <div>
                            <img src={animal2} className="App-logo" alt="logo" style={{ width: '400px' }} />

                            <button onClick={() => this.vote(animals[1].name)}>Vote</button>
                            <p>Total Votes: {animals[1].clickCount}</p>
                        </div>

                        <div>
                            <img src={animal3} className="App-logo" alt="logo" style={{ width: '400px' }} />

                            <button onClick={() => this.vote(animals[2].name)}>Vote</button>
                            <p>Total Votes: {animals[2].clickCount}</p>
                        </div>

                        <div>
                            <img src={animal4} className="App-logo" alt="logo" style={{ width: '400px' }} />

                            <button onClick={() => this.vote(animals[3].name)}>Vote</button>
                            <p>Total Votes: {animals[3].clickCount}</p>
                        </div>

                        <div>
                            <img src={animal5} className="App-logo" alt="logo" style={{ width: '400px' }} />

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
