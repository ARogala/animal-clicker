import React, { Component } from 'react';
import logo from '../click.svg';
import animal1 from '../images/animal1.jpg';
// import animal2 from '../images/animal2.jpg';

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

        // var req = require.context("../images", true, /.*\.jpg$/);

        // console.log(typeof req);
        // console.log(req);
        // console.log(req.keys());
        // // console.log(req.keys());
        // const regex1 = new RegExp(/\.\//,'gi');
        // const regex2 = new RegExp(`animal`, 'gi');
        // const regex3 = new RegExp(regex1.source + regex2.source, 'gi');

        // const filteredKeys = req.keys().filter(key => key.match(regex3));
        // console.log(filteredKeys);
        // //pass the key back into require to get the import
        // console.log(req(req.keys()[0]));
        // req.keys().forEach(function(key){
        //     req(key);
        //     console.log(req(key));
        // });
    }
    count(string) {
        console.log(typeof string)
        fetch('/vote',{method: 'PUT', body: JSON.stringify(string), headers:{'Content-Type': 'application/json'}})
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
                <div>
                    <img src={animal1} className="App-logo" alt="logo" style={{width: '200px'}}/>

                    <button onClick={()=>this.count('animal1')}>Vote</button>
                </div>
            </div>
        );
    }
}

export default App;
