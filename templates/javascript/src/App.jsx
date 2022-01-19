import React from 'react';
import Logo from './logo.svg';
import './App.css';
import HelloComponent from './components/HelloComponent';

export default function App() {
  return (
    <div className="app">
      <img src={Logo} className="app--logo" alt="logo" width="200" height="200" />
      <hr />
      <HelloComponent msg="Hello world!" />
      <p>React project by javascript</p>
    </div>
  );
}
