import React from 'react';
import Logo from './logo.svg';
import './App.css';
import classes from './App.module.css';
import HelloComponent from './components/HelloComponent';

export default function App(): React.ReactElement {
    return (
        <div className="app">
            hello
            <img src={Logo} className="App-logo" alt="logo" width="100" height="100"/>
            <hr/>
            <p className={classes.app}>
                red
            </p>
            <HelloComponent msg="Hello world!"/>
        </div>
    );
}
