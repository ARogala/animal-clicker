import React, { Component } from 'react';
import logo from '../click.svg';
import animal1 from '../images/animal1.jpg';
import animal2 from '../images/animal2.jpg';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteCountA1: 0,
            voteCountA2: 0
        };
    }

    componentDidMount() {
        fetch('/getallanimals')
            .then(res => res.json())
            .then(
                result => {
                    console.log(result);
                    for (let i = 0; i < result.length; i++) {
                        if (result[i].name === 'animal1') {
                            this.setState({ voteCountA1: result[i].clickCount });
                        } else if (result[i].name === 'animal2') {
                            this.setState({ voteCountA2: result[i].clickCount });
                        }
                    }
                },
                error => {
                    console.log(error);
                }
            );
    }
    vote(animalName) {
        console.log(typeof animalName);
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
        if (animalName === 'animal1') {
            this.setState({ voteCountA1: voteCount });
        } else if (animalName === 'animal2') {
            this.setState({ voteCountA2: voteCount });
        }
    }

    render() {
        let voteCountA1 = this.state.voteCountA1;
        let voteCountA2 = this.state.voteCountA2;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <div>
                    <img src={animal1} className="App-logo" alt="logo" style={{ width: '200px' }} />

                    <button onClick={() => this.vote('animal1')}>Vote</button>
                    <p>Total Votes: {voteCountA1}</p>
                </div>
                <div>
                    <img src={animal2} className="App-logo" alt="logo" style={{ width: '200px' }} />

                    <button onClick={() => this.vote('animal2')}>Vote</button>
                    <p>Total Votes: {voteCountA2}</p>
                </div>
            </div>
        );
    }
}

export default App;
