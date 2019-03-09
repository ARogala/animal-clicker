import React, { Component } from 'react';
import AnimalVotes from './AnimalVotes';
import Winners from './Winners';

import logo from '../click.svg';

class App extends Component {
    render() {
        const dateNow = new Date();
        const day = dateNow.getDay();
        // const day = 0;
        // console.log(day);
        //display winners on Sunday
        if (day === 0) {
            return (
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1>Animal Clicker</h1>
                        <h2>Vote for your favorites!</h2>
                    </header>
                    <Winners />
                </div>
            );
        } else if (day !== 0) {
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
}

export default App;
