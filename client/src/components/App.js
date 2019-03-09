import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import AnimalVotes from './AnimalVotes';
import Winners from './Winners';
import About from './About';

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
                    <nav className="nav">
                        <Link to="/" className="nav__link">
                            Home
                        </Link>
                        <Link to="/about" className="nav__link">
                            About
                        </Link>
                    </nav>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1>Animal Clicker</h1>
                        <h2>This weeks cutest animals!</h2>
                    </header>
                    <Route exact path="/" render={() => <Winners />} />
                    <Route path="/about" render={() => <About />} />
                </div>
            );
        } else if (day !== 0) {
            return (
                <div className="App">
                    <nav className="nav">
                        <Link to="/" className="nav__link">
                            Home
                        </Link>
                        <Link to="/about" className="nav__link">
                            About
                        </Link>
                    </nav>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1>Animal Clicker</h1>
                        <h2>Vote for your favorites!</h2>
                    </header>
                    <Route exact path="/" render={() => <AnimalVotes />} />
                    <Route path="/about" render={() => <About />} />
                </div>
            );
        }
    }
}

export default App;
