import React from 'react';
import './App.css';
import Malicious from './components/sql';
import Dos from './components/dos';
import UrlSpoof from './components/urlspoof';

function App() {
  return (
    <>
      <Malicious />
      <Dos />
      <UrlSpoof />
    </>
  )
}

export default App;
