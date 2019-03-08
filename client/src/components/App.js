import React, { Component } from 'react';
import AnimalVotes from './AnimalVotes';

import logo from '../click.svg';

class App extends Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>Animal Clicker</h1>
                    <h2>Vote for your favorites!</h2>
                </header>  
                <AnimalVotes />
            </div>
        );
    }
}

export default App;
