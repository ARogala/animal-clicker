import React, { Component } from 'react';
import logo from '../click.svg';

class App extends Component {
    componentDidMount() {
        fetch('/getdata')
            .then(res => res.json())
            .then(
                result => {
                    console.log(result);
                },
                error => {
                    console.log(error);
                }
            );
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />

                    <a href="/getdata">Get some data</a>
                </header>
            </div>
        );
    }
}

export default App;
